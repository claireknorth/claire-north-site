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
  demoKind?: string
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
            project.demoKind === 'marathonCoach' ? (
              <ExpandableMarathonProject
                key={project.title}
                project={project}
                isLast={i === projects.length - 1}
              />
            ) : project.screenshots && project.screenshots.length > 0 ? (
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
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <article
      style={{
        borderTop: '1px solid var(--rule)',
        borderBottom: isLast ? '1px solid var(--rule)' : 'none',
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${project.title.toLowerCase().replace(/\s+/g, '-')}-details`}
        onClick={() => setOpen((current) => !current)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 32,
          padding: hovered ? '28px 0 28px 8px' : '28px 0',
          border: 0,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'padding-left .2s',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: '-0.01em',
              margin: 0,
              color: hovered || open ? 'var(--accent)' : 'var(--ink)',
              transition: 'color .15s',
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
            {project.oneLineOutcome}
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
        </div>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 12,
            color: hovered || open ? 'var(--accent)' : 'var(--ink-faint)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'color .15s',
          }}
        >
          {open ? 'Close' : 'Open'} {open ? '↑' : '↓'}
        </span>
      </button>

      {open && (
        <div
          id={`${project.title.toLowerCase().replace(/\s+/g, '-')}-details`}
          style={{ padding: '0 0 36px' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <a
              href={project.url}
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
              {project.linkLabel ?? 'Demo'} ↗
            </a>
            {project.githubUrl && (
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
            )}
          </div>

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
        </div>
      )}
    </article>
  )
}

function ExpandableMarathonProject({ project, isLast }: { project: Project; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const techStack = [
    ['Agent', 'Hermes Agent (Nous Research) - persistent memory, skills, tools'],
    ['Model', 'DeepSeek V4 (OpenRouter)'],
    ['Tools', 'Strava MCP, Google Calendar, weather, training-plan files'],
    ['Delivery', 'Telegram bot'],
    ['Memory', 'Persistent across sessions'],
    ['Deployment', 'Docker on a VPS (24/7 availability)'],
  ]

  return (
    <article
      style={{
        borderTop: '1px solid var(--rule)',
        borderBottom: isLast ? '1px solid var(--rule)' : 'none',
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="ai-marathon-coach-details"
        onClick={() => setOpen((current) => !current)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 32,
          padding: hovered ? '28px 0 28px 8px' : '28px 0',
          border: 0,
          background: 'transparent',
          color: 'inherit',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'padding-left .2s',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: '-0.01em',
              margin: 0,
              color: hovered || open ? 'var(--accent)' : 'var(--ink)',
              transition: 'color .15s',
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
            {project.oneLineOutcome}
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
        </div>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 12,
            color: hovered || open ? 'var(--accent)' : 'var(--ink-faint)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'color .15s',
          }}
        >
          {open ? 'Close' : 'Open'} {open ? '↑' : '↓'}
        </span>
      </button>

      {open && (
        <div id="ai-marathon-coach-details" className="coach-details">
          <div className="coach-tech-stack">
            <h4>Tech Stack</h4>
            <dl>
              {techStack.map(([label, value]) => (
                <div className="coach-tech-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <MarathonCoachDemo />
        </div>
      )}
    </article>
  )
}

function MarathonCoachDemo() {
  const signals = [
    { label: 'Training Plan', value: '14 mi long run', tone: 'green' },
    { label: 'Strava MCP', value: 'Last run analyzed', tone: 'orange' },
    { label: 'Google Calendar', value: 'Open morning window', tone: 'amber' },
    { label: 'Weather', value: 'Cool, low wind', tone: 'blue' },
    { label: 'Coaching Memory', value: 'Start patient', tone: 'rose' },
  ]

  return (
    <div className="coach-demo" aria-label="Animated Marathon Coach workflow preview">
      <div className="coach-orbit" aria-hidden="true">
        {signals.map((signal, index) => (
          <div
            className={`coach-signal coach-signal--${signal.tone}`}
            style={{ ['--delay' as string]: `${index * 0.45}s` }}
            key={signal.label}
          >
            <span>{signal.label}</span>
            <strong>{signal.value}</strong>
          </div>
        ))}
      </div>

      <div className="coach-phone" aria-hidden="true">
        <div className="coach-phone__top">
          <span>Telegram</span>
          <span>AI Marathon Coach</span>
        </div>
        <div className="coach-card">
          <div className="coach-card__kicker">SAMPLE MORNING BRIEF</div>
          <h4>Hi Claire, today is your long run.</h4>
          <p className="coach-card__weather">
            You have 14 miles scheduled. Weather in your city looks mild: 68F, light wind,
            and humidity low enough that effort should stay honest if you start early.
          </p>
          <div className="coach-analysis-table">
            <div>
              <span>Plan</span>
              <strong>14 mi easy long run</strong>
            </div>
            <div>
              <span>Last run</span>
              <strong>8.0 mi at 9:42/mi, 149 avg HR</strong>
            </div>
            <div>
              <span>HR</span>
              <strong>Z2 for 92% of the run, 156 max</strong>
            </div>
            <div>
              <span>Finish</span>
              <strong>best mile 9:18, last 0.2 at 8:55 effort</strong>
            </div>
          </div>
          <div className="coach-note">
            <p>
              Your previous session was strong: 8 miles at 9:42/mi with a 149 bpm average, almost
              entirely Z2. The useful part is not the pace, it is the control: your fastest mile
              came late, and your heart rate stayed steady instead of drifting.
            </p>
            <p>
              That says your aerobic base is absorbing the work. For today, keep miles 1-4 almost
              boring, cap the effort before hills, and take the first gel before you feel like you
              need it. If HR is still settled after mile 10, you can let the stride open slightly.
            </p>
            <p>
              What this projects: the fitness is there, but the win is restraint. A calm long run
              today builds more marathon durability than turning the last 30 minutes into a race.
            </p>
          </div>
        </div>
      </div>
    </div>
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
