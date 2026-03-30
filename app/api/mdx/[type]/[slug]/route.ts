import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content')

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }
  const { type, slug } = await params

  if (!['projects', 'blog'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const filePath = path.join(contentDir, type, slug, 'index.mdx')

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  return NextResponse.json({ content })
}
