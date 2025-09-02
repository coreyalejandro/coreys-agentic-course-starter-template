import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

const schema = z.object({
  question: z.string().min(1),
  context: z.string().min(1)
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }
  const { question, context } = parsed.data

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    const idx = context.toLowerCase().indexOf(question.toLowerCase())
    const snippet = idx >= 0 ? context.slice(Math.max(0, idx - 200), idx + 200) : context.slice(0, 400)
    return NextResponse.json({
      answer: "AI Coach offline mode: add OPENAI_API_KEY to enable generative answers. Here's a relevant snippet from the current lesson:\n\n" + snippet
    })
  }

  const client = new OpenAI({ apiKey })
  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      { role: 'system', content: "You are a calm, accessible learning coach. Answer ONLY using the provided lesson context. Quote the exact lines you used. If it's not in context, say you don't see it."},
      { role: 'user', content: `Lesson Context:\n\n${context}\n\nQuestion: ${question}` }
    ]
  })

  const answer = resp.choices[0]?.message?.content ?? 'No answer'
  return NextResponse.json({ answer })
}
