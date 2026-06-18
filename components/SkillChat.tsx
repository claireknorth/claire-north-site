'use client'

import { useEffect, useRef, useState } from 'react'

type Message = { role: 'user' | 'assistant'; content: string }

const STARTERS = [
  'How does it work?',
  'What does it touch?',
  'Why this design?',
]

export default function SkillChat({
  slug,
  name,
  githubUrl,
}: {
  slug: string
  name: string
  githubUrl: string
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

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
      let pending: string | null = null
      let flushTimer: ReturnType<typeof setTimeout> | null = null

      const flush = () => {
        if (pending == null) return
        const next = pending
        pending = null
        setMessages([...withUser, { role: 'assistant', content: next }])
      }

      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          if (flushTimer) clearTimeout(flushTimer)
          flush()
          break
        }
        acc += decoder.decode(value, { stream: true })
        pending = acc
        // Throttle re-renders to ~30fps so the stream stays smooth
        if (!flushTimer) {
          flushTimer = setTimeout(() => {
            flushTimer = null
            flush()
          }, 32)
        }
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

  const canSend = input.trim().length > 0 && !loading

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`skill-chat-panel-${slug}`}
          className="sc-btn sc-btn--primary"
          data-open={open}
        >
          <ChatIcon />
          {open ? 'Hide chat' : 'Ask anything about this skill'}
        </button>

        <a
          href={`/api/skills/${slug}/download`}
          download={`${slug}.skill`}
          className="sc-btn sc-btn--secondary"
          title="Download as a .skill bundle. Install it in Claude.ai → Skills, or drop it in ~/.claude/skills/ for Claude Code."
        >
          <DownloadIcon />
          Download skill
        </a>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="sc-btn sc-btn--secondary"
        >
          <GitHubIcon />
          View on GitHub ↗
        </a>
      </div>

      {open && (
        <div
          id={`skill-chat-panel-${slug}`}
          style={{
            marginTop: 20,
            border: '1px solid var(--rule)',
            borderRadius: 12,
            background: 'var(--paper-raised)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Single-line panel header */}
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--rule-soft)',
              fontSize: 13,
              color: 'var(--ink-soft)',
              lineHeight: 1.45,
            }}
          >
            Ask anything about <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{name}</strong>. A narrator agent answers from the source + builder notes.
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            style={{
              minHeight: 120,
              maxHeight: 360,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            {messages.length === 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    disabled={loading}
                    className="sc-starter"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((m, i) => (
                <MessageBubble
                  key={i}
                  role={m.role}
                  content={m.content}
                  loading={loading && i === messages.length - 1}
                />
              ))
            )}
          </div>

          {/* Input */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'flex-end',
              padding: 12,
              borderTop: '1px solid var(--rule-soft)',
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              disabled={loading}
              placeholder="Type a question…"
              className="sc-textarea"
            />
            <button
              onClick={() => send(input)}
              disabled={!canSend}
              aria-label="Send message"
              className={`sc-send ${canSend ? 'sc-send--active' : 'sc-send--inactive'}`}
            >
              {loading ? '…' : '↵'}
            </button>
          </div>
        </div>
      )}
    </>
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
      }}
    >
      <div
        style={{
          maxWidth: '88%',
          fontSize: 14.5,
          lineHeight: 1.55,
          color: isUser ? 'var(--paper)' : 'var(--ink)',
          background: isUser ? 'var(--ink)' : 'var(--paper)',
          border: isUser ? 'none' : '1px solid var(--rule-soft)',
          borderRadius: 12,
          padding: '9px 13px',
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
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--ink-faint)',
        animation: 'pulse 1.2s ease-in-out infinite',
      }}
    />
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
