'use client'

import { useState } from 'react'

interface Screenshot {
  src: string
  alt: string
}

interface Project {
  title: string
  oneLineOutcome: string
  url: string
  githubUrl?: string
  stack?: string[]
  linkLabel?: string
  screenshots?: Screenshot[]
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      style={{ padding: '92px 0', borderTop: '1px solid var(--rule)' }}
    >
      <div className="projects-wrap" style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
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
            Side projects
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, i) =>
            project.screenshots && project.screenshots.length > 0 ? (
              <FeaturedProject
                key={project.title}
                project={project}
                isLast={i === projects.length - 1}
              />
            ) : (
              <ProjectRow
                key={project.title}
                project={project}
                isLast={i === projects.length - 1}
              />
            ),
          )}
        </div>
      </div>
    </section>
  )
}

function FeaturedProject({ project, isLast }: { project: Project; isLast: boolean }) {
  return (
    <article
      style={{
        padding: '28px 0 36px',
        borderTop: '1px solid var(--rule)',
        borderBottom: isLast ? '1px solid var(--rule)' : 'none',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-newsreader), Georgia, serif',
          fontWeight: 500,
          fontSize: 24,
          letterSpacing: '-0.01em',
          margin: 0,
          color: 'var(--ink)',
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
          margin: '10px 0 0',
          maxWidth: '68ch',
        }}
      >
        {project.oneLineOutcome} Check it out!! Here&apos;s a{' '}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent)',
            textDecoration: 'none',
            borderBottom: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
          }}
        >
          demo
        </a>
        .
      </p>
      {project.stack && project.stack.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
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
      {project.githubUrl && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: 13,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            GitHub ↗
          </a>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          gap: 14,
          overflowX: 'auto',
          marginTop: 22,
          padding: '4px 0 12px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {project.screenshots!.map((shot) => (
          <figure
            key={shot.src}
            style={{
              margin: 0,
              flex: '0 0 168px',
              background: '#12101f',
              borderRadius: 22,
              padding: 6,
              boxShadow: '0 10px 28px color-mix(in srgb, #12101f 18%, transparent)',
            }}
          >
            <img
              src={shot.src}
              alt={shot.alt}
              width={390}
              height={780}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: 16,
              }}
            />
          </figure>
        ))}
      </div>
    </article>
  )
}

function ProjectRow({ project, isLast }: { project: Project; isLast: boolean }) {
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
        {project.linkLabel ?? 'Demo'} ↗
      </span>
    </a>
  )
}
