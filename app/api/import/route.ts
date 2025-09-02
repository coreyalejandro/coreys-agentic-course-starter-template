import { NextResponse } from 'next/server'
import { parseMarkdownToHtmlAndText } from '@/lib/md'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 })
    }
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: 400 })
    const md = await res.text()

    const { html, plain } = await parseMarkdownToHtmlAndText(md)
    const slug = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8)
    const dir = path.join(process.cwd(), 'public', 'courses', slug)
    await mkdir(dir, { recursive: true })

    await writeFile(path.join(dir, 'course.json'), JSON.stringify({
      title: 'Imported Course',
      description: `Imported from ${url}`,
      lessons: [{ id: 'l1', title: 'Lesson 1', file: 'lesson-1.md' }]
    }, null, 2))
    await writeFile(path.join(dir, 'lesson-1.md'), md, 'utf-8')

    return NextResponse.json({ slug })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Import failed' }, { status: 500 })
  }
}
