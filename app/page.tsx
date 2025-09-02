import Link from 'next/link'
import AccessibilityBar from '@/components/AccessibilityBar'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <AccessibilityBar />
      <header className="mt-8 mb-6">
        <h1 className="text-3xl font-bold">AI‑First Course Player — MVB</h1>
        <p className="text-gray-600 mt-2">
          Calm, accessible, one‑screen learning with an AI Coach grounded in the current lesson.
        </p>
      </header>

      <section className="grid gap-4">
        <Link
          href="/learn/demo"
          className="rounded-xl border p-6 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          <h2 className="text-xl font-semibold">▶ Start Demo Course</h2>
          <p className="text-gray-600">A short lesson that demonstrates the player, coach, and narration.</p>
        </Link>

        <Link
          href="/learn/import?src=https://raw.githubusercontent.com/mdn/content/main/files/en-us/learn/javascript/first_steps/what_is_javascript/index.md"
          className="rounded-xl border p-6 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
        >
          <h2 className="text-xl font-semibold">🌐 Import Markdown by URL</h2>
          <p className="text-gray-600">Paste a raw Markdown URL (e.g., from GitHub) to learn from real content.</p>
        </Link>
      </section>

      <footer className="mt-12 text-sm text-gray-500">
        Tip: Use the top bar to adjust font size, spacing, contrast, and narration.
      </footer>
    </main>
  )
}
