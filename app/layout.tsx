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
      <body className="app-body">
        <main className="main-container">
          <h1 className="app-title">🎬 Watch-this</h1>
          {children}
        </main>
        <footer className="footer">
          &copy; {new Date().getFullYear()} Watch-this. All rights reserved.
        </footer>
      </body>
    </html>
  )
}

