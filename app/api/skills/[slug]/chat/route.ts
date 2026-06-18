import type { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getSkill } from '@/lib/skills'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const client = new Anthropic()

const RATE_LIMIT = 8
const WINDOW_MS = 60_000
const ipHits = new Map<string, { count: number; resetAt: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return new Response('Slow down — try again in a minute.', { status: 429 })
  }

  const skill = await getSkill(params.slug)
  if (!skill) return new Response('Skill not found', { status: 404 })

  let messages: ChatMessage[] = []
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] }
    messages = body.messages ?? []
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!messages.length) return new Response('No messages', { status: 400 })
  const trimmed = messages.slice(-12)

  const systemText = `You are a narrator helping visitors of Claire North's portfolio understand the "${skill.name}" Claude skill she built. You are NOT roleplaying as the skill itself — you are talking ABOUT it, in the third person.

Answer questions about: what the skill does, what tools or services it touches, how it works, why Claire designed it this way, what tradeoffs she made, and what kinds of problems it solves.

Style: concise. 2–4 sentences unless the visitor asks for depth. No preamble ("Great question…"). Don't restate the question. Speak about Claire in the third person ("Claire built this so…", not "I built this…").

If the visitor asks something not covered in the SKILL.md or builder notes below, say so honestly — do not invent details. If they ask something off-topic (not about this skill), politely redirect.

=== SKILL.md (full source — what Claude reads when this skill triggers) ===
${skill.rawMarkdown}

=== BUILDER NOTES (Claire's own notes on how and why she built this) ===
${skill.builderNotes ?? '(Claire has not written builder notes for this skill yet — answer only from the SKILL.md above.)'}`

  const stream = client.messages.stream({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: systemText,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: trimmed.map((m) => ({ role: m.role, content: m.content })),
  })

  const encoder = new TextEncoder()
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown error'
        controller.enqueue(encoder.encode(`\n\n[The narrator hit an error: ${msg}]`))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
    },
  })
}
