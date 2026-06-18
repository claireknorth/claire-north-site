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

  const githubUrl = `${GITHUB_BASE}/${skill.slug}`

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
                background:
                  skill.category === 'Work'
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
            {skill.preview}
          </p>

          {/* Action row: GitHub + Ask the builder. SkillChat renders both
              the trigger pill (inline) and the expandable panel (below). */}
          <SkillChat slug={skill.slug} name={skill.name} githubUrl={githubUrl} />
        </div>

        {/* Body */}
        <div style={{ padding: '56px 0 96px' }}>
          <div
            className="skill-prose"
            dangerouslySetInnerHTML={{ __html: skill.contentHtml }}
          />
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
