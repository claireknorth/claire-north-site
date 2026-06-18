'use client'

import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  'How does this skill actually work?',
  'What tools or services does it touch?',
  'Why did Claire design it this way?',
]

export default function SkillChat({ slug, name }: { slug: string; name: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    setInput('')
    setLoading(true)

    const userTurn: Message = { role: 'user', content: trimmed }
    const withUser = [...messages, userTurn]
    setMessages([...withUser, { role: 'assistant', content: '' }])

    try {
      const res = await fetch(`/api/skills/${slug}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: withUser }),
      })

      if (!res.ok || !res.body) {
        const errText = (await res.text().catch(() => '')) || 'Something went wrong.'
        setMessages([...withUser, { role: 'assistant', content: errText }])
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages([...withUser, { role: 'assistant', content: acc }])
      }
    } catch {
      setMessages([
        ...withUser,
        { role: 'assistant', content: 'Connection issue — try again in a moment.' },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <section
      aria-label={`Ask about the ${name} skill`}
      style={{
        marginTop: 64,
        padding: '40px 32px',
        border: '1px solid var(--rule)',
        borderRadius: 12,
        background: 'color-mix(in srgb, var(--paper) 96%, var(--ink) 4%)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}
        >
          Ask the builder
        </span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontWeight: 500,
          fontSize: 'clamp(22px, 2.4vw, 28px)',
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          margin: '0 0 8px',
          color: 'var(--ink)',
        }}
      >
        Curious how this was built?
      </h2>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.55,
          color: 'var(--ink-soft)',
          margin: '0 0 24px',
          maxWidth: '60ch',
        }}
      >
        Ask anything about how the {name} skill works, what it touches, or why Claire designed
        it this way. A narrator agent answers from her builder notes.
      </p>

      {messages.length === 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {STARTERS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              disabled={loading}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: 13,
                color: 'var(--ink-soft)',
                background: 'var(--paper)',
                border: '1px solid var(--rule)',
                borderRadius: 999,
                padding: '7px 14px',
                cursor: loading ? 'default' : 'pointer',
                transition: 'border-color .15s, color .15s',
              }}
              onMouseEnter={(e) => {
                if (loading) return
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--rule)'
                e.currentTarget.style.color = 'var(--ink-soft)'
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div
          ref={scrollRef}
          style={{
            maxHeight: 480,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            marginBottom: 20,
            padding: '4px 4px 4px 0',
          }}
        >
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} loading={loading && i === messages.length - 1} />
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          border: '1px solid var(--rule)',
          borderRadius: 10,
          padding: 10,
          background: 'var(--paper)',
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={loading}
          placeholder={`Ask about ${name}…`}
          style={{
            flex: 1,
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: 15,
            lineHeight: 1.5,
            color: 'var(--ink)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '4px 6px',
            minHeight: 24,
            maxHeight: 160,
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: input.trim() && !loading ? 'var(--paper)' : 'var(--ink-faint)',
            background: input.trim() && !loading ? 'var(--ink)' : 'transparent',
            border: `1px solid ${input.trim() && !loading ? 'var(--ink)' : 'var(--rule)'}`,
            borderRadius: 8,
            padding: '8px 14px',
            cursor: loading || !input.trim() ? 'default' : 'pointer',
            transition: 'all .15s',
            whiteSpace: 'nowrap',
          }}
        >
          {loading ? '…' : 'Ask ↵'}
        </button>
      </div>
      <p
        style={{
          fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
          fontSize: 11,
          color: 'var(--ink-faint)',
          margin: '10px 2px 0',
        }}
      >
        Powered by Claude Haiku 4.5 · Answers grounded in the skill source + Claire&apos;s builder notes
      </p>
    </section>
  )
}

function MessageBubble({
  role,
  content,
  loading,
}: {
  role: 'user' | 'assistant'
  content: string
  loading: boolean
}) {
  const isUser = role === 'user'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--ink-faint)',
        }}
      >
        {isUser ? 'You' : 'Narrator'}
      </span>
      <div
        style={{
          maxWidth: '88%',
          fontSize: 15,
          lineHeight: 1.6,
          color: isUser ? 'var(--paper)' : 'var(--ink)',
          background: isUser ? 'var(--ink)' : 'var(--paper)',
          border: isUser ? '1px solid var(--ink)' : '1px solid var(--rule)',
          borderRadius: 10,
          padding: '10px 14px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {content || (loading ? <Pulse /> : '')}
      </div>
    </div>
  )
}

function Pulse() {
  return (
    <span
      aria-label="Thinking"
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--ink-faint)',
        animation: 'pulse 1.2s ease-in-out infinite',
      }}
    />
  )
}
