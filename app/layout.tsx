import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI-First Course Player — MVB',
  description: 'Accessible, AI-powered course player with grounded Coach.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
