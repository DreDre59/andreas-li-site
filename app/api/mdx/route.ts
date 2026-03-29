import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

function getMDXFiles(type: 'projects' | 'blog') {
  const dir = path.join(contentDir, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory())
    .map((slug) => ({ slug, type }))
}

export async function GET() {
  const projects = getMDXFiles('projects')
  const blogs = getMDXFiles('blog')
  return NextResponse.json([...projects, ...blogs])
}

export async function POST(request: NextRequest) {
  const { type, slug, content } = await request.json()

  if (!type || !slug || content === undefined) {
    return NextResponse.json({ error: 'Missing type, slug, or content' }, { status: 400 })
  }

  if (!['projects', 'blog'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  // Prevent path traversal
  if (slug.includes('..') || slug.includes('/') || slug.includes('\\')) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }

  const filePath = path.join(contentDir, type, slug, 'index.mdx')

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  return NextResponse.json({ ok: true })
}
