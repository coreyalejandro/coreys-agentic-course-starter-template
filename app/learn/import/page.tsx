'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AccessibilityBar from '@/components/AccessibilityBar'

export default function ImportPage({ searchParams }: { searchParams: { src?: string } }) {
  const [url, setUrl] = useState(searchParams.src ?? '')
  const [status, setStatus] = useState<'idle'|'loading'|'done'|'error'>('idle')
  const [slug, setSlug] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  async function importMarkdown() {
    if (!url || !url.trim()) {
      setError('Please enter a URL')
      setStatus('error')
      return
    }
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      })
      if (!res.ok) {
        let errorMessage = 'Import failed'
        try {
          const errorData = await res.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          errorMessage = await res.text() || errorMessage
        }
        throw new Error(errorMessage)
      }
      const data = await res.json()
      setSlug(data.slug)
      setStatus('done')
    } catch (e: any) {
      setError(e?.message ?? 'Failed to import')
      setStatus('error')
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <AccessibilityBar />
      <h1 className="text-2xl font-bold mb-3">Import Markdown by URL</h1>
      <p className="text-gray-600 mb-4">Paste a raw Markdown URL (e.g., a GitHub raw link). We will fetch, parse, and stage it as a 1‑lesson course.</p>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg p-3"
          placeholder="https://raw.githubusercontent.com/.../lesson.md"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={importMarkdown}
          disabled={status==='loading' || !url}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          {status==='loading' ? 'Importing…' : 'Import'}
        </button>
      </div>
      {status==='error' && <p className="text-red-600 mt-3">{error}</p>}
      {status==='done' && slug && (
        <p className="mt-4">
          Imported. <Link href={`/learn/${slug}`} className="underline">Open your course →</Link>
        </p>
      )}
    </main>
  )
}
