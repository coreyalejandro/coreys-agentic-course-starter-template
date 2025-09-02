import { notFound } from 'next/navigation'
import { loadCourse, type Lesson } from '@/lib/course'
import CoachDrawer from '@/components/CoachDrawer'
import AccessibilityBar from '@/components/AccessibilityBar'
import PracticePanel from '@/components/PracticePanel'

export default async function LearnPage({ params }: { params: { slug: string } }) {
  const course = await loadCourse(params.slug)
  if (!course) return notFound()
  const lesson: Lesson = course.lessons[0]

  return (
    <main className="max-w-5xl mx-auto p-6">
      <AccessibilityBar />
      <article className="grid md:grid-cols-[1fr_360px] gap-6 mt-4">
        <section aria-labelledby="lesson-title" className="rounded-xl border p-5">
          <h1 id="lesson-title" className="text-2xl font-bold">{lesson.title}</h1>
          <div className="markdown" dangerouslySetInnerHTML={{ __html: lesson.html }} />
          <PracticePanel initialTextContent={lesson.plain} />
        </section>

        <aside className="md:sticky md:top-4 h-fit rounded-xl border">
          <CoachDrawer context={lesson.plain} />
        </aside>
      </article>
    </main>
  )
}
