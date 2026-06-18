import type { NextRequest } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const SLUG_PATTERN = /^[a-z0-9-]+$/

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  if (!SLUG_PATTERN.test(params.slug)) {
    return new Response('Invalid slug', { status: 400 })
  }

  const file = path.join(
    process.cwd(),
    'skills',
    params.slug,
    `${params.slug}.skill`,
  )

  if (!existsSync(file)) {
    return new Response('Skill bundle not found', { status: 404 })
  }

  const buffer = readFileSync(file)
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${params.slug}.skill"`,
      'Content-Length': String(buffer.length),
      'Cache-Control': 'public, max-age=300',
    },
  })
}
