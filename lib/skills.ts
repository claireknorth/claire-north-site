import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export interface SkillMeta {
  slug: string
  name: string
  description: string
  category: string
  tags?: string[]
}

export interface SkillDetail extends SkillMeta {
  contentHtml: string
}

const skillsDir = path.join(process.cwd(), 'skills')

export function getAllSkills(): SkillMeta[] {
  if (!fs.existsSync(skillsDir)) return []

  const slugs = fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  return slugs
    .map((slug) => {
      const file = path.join(skillsDir, slug, 'SKILL.md')
      if (!fs.existsSync(file)) return null
      const raw = fs.readFileSync(file, 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        name: data.name ?? slug,
        description: data.description ?? '',
        category: data.category ?? 'Work',
        tags: data.tags ?? [],
      } as SkillMeta
    })
    .filter(Boolean) as SkillMeta[]
}

export async function getSkill(slug: string): Promise<SkillDetail | null> {
  const file = path.join(skillsDir, slug, 'SKILL.md')
  if (!fs.existsSync(file)) return null

  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)

  const processed = await remark().use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    name: data.name ?? slug,
    description: data.description ?? '',
    category: data.category ?? 'Work',
    tags: data.tags ?? [],
    contentHtml,
  }
}

export function getAllSkillSlugs(): string[] {
  if (!fs.existsSync(skillsDir)) return []
  return fs
    .readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => fs.existsSync(path.join(skillsDir, d.name, 'SKILL.md')))
    .map((d) => d.name)
}
