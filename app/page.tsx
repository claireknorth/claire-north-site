import { getAllSkills } from '@/lib/skills'
import Header from '@/components/Header'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import WritingSection from '@/components/WritingSection'
import projectsData from '@/content/projects.json'
import writingData from '@/content/writing.json'

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

export default function Home() {
  const skills = getAllSkills()

  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section
          id="top"
          style={{ padding: '96px 0 120px' }}
        >
          <div
            style={{
              maxWidth: 1160,
              margin: '0 auto',
              padding: '0 48px',
            }}
          >
            <div style={{ maxWidth: 680 }}>
              <h1
                style={{
                  fontFamily: 'var(--font-newsreader), Georgia, serif',
                  fontWeight: 500,
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: '0 0 40px',
                  color: 'var(--ink)',
                }}
              >
                Hi, I&apos;m Claire.
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-newsreader), Georgia, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(22px, 2.4vw, 30px)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.01em',
                  margin: '0 0 20px',
                  color: 'var(--ink)',
                }}
              >
                I&apos;m a product manager building AI-native products. Currently at{' '}
                <a
                  href="https://tennr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    borderBottom: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)',
                    fontWeight: 500,
                  }}
                >
                  Tennr
                </a>
                , an AI patient orchestration platform for healthcare providers.
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-newsreader), Georgia, serif',
                  fontWeight: 400,
                  fontSize: 'clamp(18px, 1.8vw, 22px)',
                  lineHeight: 1.55,
                  color: 'var(--ink-soft)',
                  margin: '0 0 40px',
                }}
              >
                Previously a software engineer at{' '}
                <a href="https://www.gemini.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', borderBottom: '1px solid var(--rule)' }}>Gemini</a>
                {' '}and{' '}
                <a href="https://www.disneyplus.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', borderBottom: '1px solid var(--rule)' }}>Disney+</a>
                . Duke and Wharton.
              </p>

              <div
                style={{
                  height: 1,
                  background: 'var(--rule)',
                  margin: '0 0 24px',
                  maxWidth: 540,
                }}
              />

              <nav
                style={{
                  display: 'flex',
                  gap: 24,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {[
                  { href: 'https://www.linkedin.com/in/claire-k-north/', label: 'LinkedIn', Icon: LinkedInIcon },
                  { href: 'https://x.com/cnorth_13', label: 'X', Icon: XIcon },
                  { href: 'https://github.com/claireknorth/', label: 'GitHub', Icon: GitHubIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--ink-soft)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <Icon />
                    {label}
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>↗</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        <SkillsSection skills={skills} />
        <ProjectsSection projects={projectsData} />
        <WritingSection entries={writingData} />
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--rule)', padding: '56px 0 72px' }}>
        <div
          style={{
            maxWidth: 1160,
            margin: '0 auto',
            padding: '0 48px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {[
                { href: 'https://www.linkedin.com/in/claire-k-north/', label: 'LinkedIn', Icon: LinkedInIcon },
                { href: 'https://x.com/cnorth_13', label: 'X', Icon: XIcon },
                { href: 'https://github.com/claireknorth/', label: 'GitHub', Icon: GitHubIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', color: 'var(--ink-soft)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
