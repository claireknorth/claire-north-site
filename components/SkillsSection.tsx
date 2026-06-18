'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SkillMeta } from '@/lib/skills'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Work', value: 'Work' },
  { label: 'Life', value: 'Life' },
]

export default function SkillsSection({ skills }: { skills: SkillMeta[] }) {
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? skills : skills.filter((s) => s.category === active)

  const count = (cat: string) =>
    cat === 'all' ? skills.length : skills.filter((s) => s.category === cat).length

  return (
    <section
      id="skills"
      style={{
        padding: '92px 0',
        borderTop: '1px solid var(--rule)',
      }}
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
              margin: '0 0 14px',
              color: 'var(--ink)',
            }}
          >
            Claude skills
          </h2>
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
          {FILTERS.map(({ label, value }) => {
            const isActive = active === value
            return (
              <button
                key={value}
                onClick={() => setActive(value)}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? 'var(--paper)' : 'var(--ink-soft)',
                  background: isActive ? 'var(--ink)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--ink)' : 'var(--rule)'}`,
                  borderRadius: 999,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all .16s',
                }}
              >
                {label}{' '}
                <span
                  style={{
                    color: isActive
                      ? 'color-mix(in srgb, var(--paper) 60%, transparent)'
                      : 'var(--ink-faint)',
                    marginLeft: 6,
                  }}
                >
                  {count(value)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Skills list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {visible.map((skill) => (
            <SkillRow key={skill.slug} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillRow({ skill }: { skill: SkillMeta }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/skills/${skill.slug}`}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 32,
        padding: hovered ? '20px 0 20px 8px' : '20px 0',
        borderTop: '1px solid var(--rule)',
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
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: '-0.02em',
            margin: 0,
            color: hovered ? 'var(--accent)' : 'var(--ink)',
            transition: 'color .15s',
            whiteSpace: 'nowrap',
          }}
        >
          {skill.name}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: 'var(--ink-soft)',
            margin: '8px 0 0',
            maxWidth: '64ch',
          }}
        >
          {skill.preview}
        </p>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
          fontSize: 12,
          color: hovered ? 'var(--accent)' : 'var(--ink-faint)',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          transition: 'color .15s',
        }}
      >
        {skill.category} ↗
      </span>
    </Link>
  )
}
