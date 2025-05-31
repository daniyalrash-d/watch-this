// app/layout.tsx
import './styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Watch-this',
  description: 'Get smart recommendations for movies, series, or anime.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-950 text-white min-h-screen">
        <main className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-6 text-center">🎬 Watch-this</h1>
          {children}
        </main>
      </body>
    </html>
  )
}
