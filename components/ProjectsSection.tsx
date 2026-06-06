'use client'

import { useState } from 'react'

interface Project {
  title: string
  oneLineOutcome: string
  url: string
  stack?: string[]
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      style={{ padding: '92px 0', borderTop: '1px solid var(--rule)' }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 48 }}>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 14px',
            }}
          >
            Projects
          </p>
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
            Apps and agents I&apos;ve shipped.
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, i) => (
            <ProjectRow key={i} project={project} isLast={i === projects.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, isLast }: { project: { title: string; oneLineOutcome: string; url: string; stack?: string[] }; isLast: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 32,
        padding: hovered ? '20px 0 20px 8px' : '20px 0',
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
            fontSize: 24,
            letterSpacing: '-0.01em',
            margin: 0,
            color: hovered ? 'var(--accent)' : 'var(--ink)',
            transition: 'color .15s',
          }}
        >
          {project.title}
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
          {project.oneLineOutcome}
        </p>
        {project.stack && project.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
            {project.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
                  fontSize: 12,
                  color: 'var(--ink-soft)',
                  border: '1px solid var(--rule)',
                  borderRadius: 6,
                  padding: '4px 9px',
                  whiteSpace: 'nowrap',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
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
        Demo ↗
      </span>
    </a>
  )
}
