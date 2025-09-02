import { parseMarkdownToHtmlAndText } from '@/lib/md'
import { readFile } from 'fs/promises'
import path from 'path'

export type Lesson = {
  id: string
  title: string
  html: string
  plain: string
}

export type Course = {
  title: string
  description?: string
  lessons: Lesson[]
}

export async function loadCourse(slug: string): Promise<Course | null> {
  try {
    const base = path.join(process.cwd(), 'public', 'courses', slug)
    const raw = await readFile(path.join(base, 'course.json'), 'utf-8')
    const cfg = JSON.parse(raw) as { title: string; description?: string; lessons: { id: string; title: string; file: string }[] }

    const lessons: Lesson[] = []
    for (const l of cfg.lessons) {
      const md = await readFile(path.join(base, l.file), 'utf-8')
      const { html, plain } = await parseMarkdownToHtmlAndText(md)
      lessons.push({ id: l.id, title: l.title, html, plain })
    }
    return { title: cfg.title, description: cfg.description, lessons }
  } catch {
    return null
  }
}
