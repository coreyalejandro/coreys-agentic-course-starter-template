import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function parseMarkdownToHtmlAndText(md: string) {
  const parsed = matter(md)
  const processed = await remark().use(html).process(parsed.content)
  const htmlStr = String(processed)
  const plain = parsed.content
    .replace(/[#*>`_\-]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
  return { html: htmlStr, plain }
}
