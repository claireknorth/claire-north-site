import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSkill, getAllSkillSlugs } from '@/lib/skills'
import Header from '@/components/Header'
import SkillChat from '@/components/SkillChat'

export async function generateStaticParams() {
  return getAllSkillSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const skill = await getSkill(params.slug)
  if (!skill) return {}
  return {
    title: `${skill.name} — Claire North`,
    description: skill.description,
  }
}

const GITHUB_BASE = 'https://github.com/claireknorth/claire-north-site/tree/main/skills'

export default async function SkillPage({ params }: { params: { slug: string } }) {
  const skill = await getSkill(params.slug)
  if (!skill) notFound()

  return (
    <>
      <Header />
      <main style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
        {/* Breadcrumb */}
        <nav
          style={{
            padding: '32px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
            fontSize: 13,
            color: 'var(--ink-faint)',
          }}
        >
          <Link
            href="/#skills"
            style={{
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            Skills
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--ink-soft)' }}>{skill.name}</span>
        </nav>

        {/* Header */}
        <div
          style={{
            padding: '48px 0 56px',
            borderBottom: '1px solid var(--rule)',
            maxWidth: 800,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans), system-ui, sans-serif',
                fontSize: 11.5,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '4px 9px',
                borderRadius: 5,
                color: skill.category === 'Work' ? 'var(--accent)' : '#8a5a1f',
                background: skill.category === 'Work'
                  ? 'color-mix(in srgb, var(--accent) 12%, var(--paper))'
                  : '#f4ece0',
              }}
            >
              {skill.category}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: '0 0 18px',
              color: 'var(--ink)',
            }}
          >
            {skill.name}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 'clamp(18px, 2vw, 22px)',
              lineHeight: 1.5,
              color: 'var(--ink-soft)',
              margin: '0 0 32px',
            }}
          >
            {skill.description}
          </p>

          <a
            href={`${GITHUB_BASE}/${skill.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-jetbrains-mono), ui-monospace, monospace',
              fontSize: 13,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              border: '1px solid var(--rule)',
              borderRadius: 8,
              padding: '8px 14px',
              transition: 'border-color .15s, color .15s',
            }}
          >
            <GitHubIcon />
            View on GitHub ↗
          </a>
        </div>

        {/* Body */}
        <div style={{ padding: '56px 0 32px' }}>
          <div
            className="skill-prose"
            dangerouslySetInnerHTML={{ __html: skill.contentHtml }}
          />
        </div>

        {/* Builder chat */}
        <div style={{ paddingBottom: 96, maxWidth: 800 }}>
          <SkillChat slug={skill.slug} name={skill.name} />
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--rule)', padding: '40px 0 56px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-newsreader), Georgia, serif',
              fontSize: 16,
              color: 'var(--ink-soft)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            ← Back to clairenorth.dev
          </Link>
        </div>
      </footer>
    </>
  )
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)
