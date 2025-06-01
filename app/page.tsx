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
    <main className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          What are you looking for?
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            <option value="movie">Movie</option>
            <option value="series">TV Series</option>
            <option value="anime">Anime</option>
          </select>
        </label>

        <label className="label">
          Choose a genre (optional)
          <input
            type="text"
            placeholder="e.g., Action, Romance, Thriller"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="input"
          />
        </label>

        <label className="label">
          Or enter a title you already love (optional)
          <input
            type="text"
            placeholder="e.g., Inception"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="button"
        >
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
		<section className="results-section">
		  <h2>Suggestions</h2>
		  <ul className="results-list">
			{results.map((title, i) => (
			  <li key={i}>{title}</li>
			))}
		  </ul>
		</section>
      )}
    </main>
  )
}
