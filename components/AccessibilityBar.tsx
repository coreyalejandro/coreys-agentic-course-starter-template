'use client'

import { useEffect, useState } from 'react'

export default function AccessibilityBar() {
  const [font, setFont] = useState(16)
  const [line, setLine] = useState(1.6)
  const [contrast, setContrast] = useState(false)
  const [dys, setDys] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', font + 'px')
  }, [font])

  useEffect(() => {
    document.documentElement.style.setProperty('--line-height', String(line))
  }, [line])

  useEffect(() => {
    document.documentElement.setAttribute('data-high-contrast', String(contrast))
  }, [contrast])

  useEffect(() => {
    document.documentElement.setAttribute('data-dyslexic-font', String(dys))
  }, [dys])

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto p-3 flex flex-wrap items-center gap-4 text-sm">
        <span className="font-medium">Accessibility</span>
        <label className="flex items-center gap-2">
          A−
          <input type="range" min={14} max={22} value={font} onChange={(e)=>setFont(Number(e.target.value))} />
          A+
        </label>
        <label className="flex items-center gap-2">
          Line
          <input type="range" min={1.2} max={2.0} step={0.1} value={line} onChange={(e)=>setLine(Number(e.target.value))} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={contrast} onChange={(e)=>setContrast(e.target.checked)} />
          High contrast
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={dys} onChange={(e)=>setDys(e.target.checked)} />
          Dyslexic font
        </label>
        <Narrator />
      </div>
    </div>
  )
}

function Narrator() {
  const [speaking, setSpeaking] = useState(false)

  function speakPage() {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const selection = document.querySelector('main')?.innerText ?? document.body.innerText
    const utter = new SpeechSynthesisUtterance(selection.slice(0, 12000))
    utter.rate = 1.0
    utter.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utter)
    setSpeaking(true)
  }

  return (
    <button
      className="ml-auto rounded-md border px-3 py-1.5 hover:bg-gray-50"
      onClick={speakPage}
      aria-pressed={speaking}
    >
      {speaking ? '⏹ Stop narration' : '🔊 Narrate page'}
    </button>
  )
}
