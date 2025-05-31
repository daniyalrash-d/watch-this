'use client'

import React, { useState } from 'react'

export default function Home() {
  const [type, setType] = useState('movie')
  const [genre, setGenre] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResults([])

    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          genre: genre.trim() || undefined,
          title: title.trim() || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to fetch recommendations')
        setLoading(false)
        return
      }

      setResults(data.results || [])
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Watch-this</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          What are you looking for?
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          >
            <option value="movie">Movie</option>
            <option value="series">TV Series</option>
            <option value="anime">Anime</option>
          </select>
        </label>

        <label className="block">
          Choose a genre (optional)
          <input
            type="text"
            placeholder="e.g., Action, Romance, Thriller"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Or enter a title you already love (optional)
          <input
            type="text"
            placeholder="e.g., Inception"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {results.length > 0 && (
        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Suggestions</h2>
          <ul className="list-disc list-inside space-y-2">
            {results.map((title, i) => (
              <li key={i}>{title}</li>
            ))}
          </ul>

        </section>
      )}
    </main>
  )
}
