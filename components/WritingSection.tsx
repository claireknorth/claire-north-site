'use client'

import { useState } from 'react'

interface WritingEntry {
  title: string
  url: string
  description?: string
  meta?: string
}

export default function WritingSection({ entries }: { entries: WritingEntry[] }) {
  return (
    <section
      id="writing"
      style={{ padding: '92px 0', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontWeight: 500,
              fontSize: 'clamp(30px, 3.4vw, 42px)',
              lineHeight: 1.1,
              letterSpacing: '-0.018em',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Writing
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {entries.map((entry, i) => (
            <WritingRow key={i} entry={entry} isLast={i === entries.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WritingRow({ entry, isLast }: { entry: WritingEntry; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 32,
        padding: hovered ? '26px 0 26px 8px' : '26px 0',
        borderTop: '1px solid var(--rule)',
        borderBottom: isLast ? '1px solid var(--rule)' : 'none',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'padding-left .2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ minWidth: 0 }}>
        <h3
          style={{
            fontFamily: 'var(--font-newsreader), Georgia, serif',
            fontWeight: 500,
            fontSize: 23,
            letterSpacing: '-0.01em',
            margin: '0 0 7px',
            color: hovered ? 'var(--accent)' : 'var(--ink)',
            transition: 'color .15s',
          }}
        >
          {entry.title}
        </h3>
        {entry.description && (
          <p
            style={{
              fontSize: 15.5,
              color: 'var(--ink-soft)',
              margin: 0,
              maxWidth: '62ch',
            }}
          >
            {entry.description}
          </p>
        )}
      </div>
      {entry.meta && (
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 12,
            color: hovered ? 'var(--accent)' : 'var(--ink-faint)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'color .15s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {entry.meta} ↗
        </span>
      )}
    </a>
  )
}
