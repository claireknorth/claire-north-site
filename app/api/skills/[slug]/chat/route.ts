import type { NextRequest } from 'next/server'
import { getSkill } from '@/lib/skills'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const OPENROUTER_CHAT_URL = 'https://openrouter.ai/api/v1/chat/completions'
const DEFAULT_OPENROUTER_MODEL = 'openrouter/auto'

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
type OpenRouterChunk = {
  choices?: Array<{ delta?: { content?: string | null } }>
  error?: { message?: string }
}

function getOpenRouterHeaders(req: NextRequest, apiKey: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'X-Title': process.env.OPENROUTER_APP_NAME ?? 'Claire North Portfolio',
  }

  const referer = process.env.OPENROUTER_SITE_URL ?? req.nextUrl.origin
  if (referer) headers['HTTP-Referer'] = referer

  return headers
}

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
  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return new Response('OPENROUTER_API_KEY is not configured', { status: 500 })
  }

  const systemText = `You are a narrator helping visitors of Claire North's portfolio understand the "${skill.name}" Claude skill she built. You are NOT roleplaying as the skill itself — you are talking ABOUT it, in the third person.

Answer questions about: what the skill does, what tools or services it touches, how it works, why Claire designed it this way, what tradeoffs she made, and what kinds of problems it solves.

Style: concise. 2–4 sentences unless the visitor asks for depth. No preamble ("Great question…"). Don't restate the question. Speak about Claire in the third person ("Claire built this so…", not "I built this…").

If the visitor asks something not covered in the SKILL.md or builder notes below, say so honestly — do not invent details. If they ask something off-topic (not about this skill), politely redirect.

=== SKILL.md (full source — what Claude reads when this skill triggers) ===
${skill.rawMarkdown}

=== BUILDER NOTES (Claire's own notes on how and why she built this) ===
${skill.builderNotes ?? '(Claire has not written builder notes for this skill yet — answer only from the SKILL.md above.)'}`

  const encoder = new TextEncoder()
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const openRouterRes = await fetch(OPENROUTER_CHAT_URL, {
          method: 'POST',
          headers: getOpenRouterHeaders(req, apiKey),
          body: JSON.stringify({
            model: process.env.OPENROUTER_MODEL ?? DEFAULT_OPENROUTER_MODEL,
            max_tokens: 1024,
            stream: true,
            plugins: [
              {
                id: 'auto-router',
                cost_quality_tradeoff: 10,
              },
            ],
            messages: [
              { role: 'system', content: systemText },
              ...trimmed.map((m) => ({ role: m.role, content: m.content })),
            ],
          }),
        })

        if (!openRouterRes.ok) {
          const text = await openRouterRes.text().catch(() => '')
          throw new Error(
            `OpenRouter ${openRouterRes.status}: ${text.slice(0, 240) || openRouterRes.statusText}`,
          )
        }

        if (!openRouterRes.body) throw new Error('OpenRouter returned no stream')

        const reader = openRouterRes.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmedLine = line.trim()
            if (!trimmedLine.startsWith('data:')) continue

            const data = trimmedLine.slice(5).trim()
            if (!data || data === '[DONE]') continue

            const parsed = JSON.parse(data) as OpenRouterChunk
            if (parsed.error?.message) throw new Error(parsed.error.message)

            const text = parsed.choices?.[0]?.delta?.content
            if (text) controller.enqueue(encoder.encode(text))
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
