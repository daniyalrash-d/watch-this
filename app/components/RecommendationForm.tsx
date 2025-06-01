'use client'

import { useState } from 'react'

export default function RecommendationForm() {
  const [type, setType] = useState('movie')
  const [genre, setGenre] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ type, genre, title })
    // TODO: Send to backend
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div>
        <label className="label" htmlFor="type-select">What are you looking for?</label>
        <select
          id="type-select"
          className="input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
        </select>
      </div>

      <div>
        <label className="label" htmlFor="genre-input">Choose a genre:</label>
        <input
          id="genre-input"
          type="text"
          placeholder="e.g. Action, Comedy, Sci-Fi"
          className="input"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div>
        <label className="label" htmlFor="title-input">Or enter a title you already love:</label>
        <input
          id="title-input"
          type="text"
          placeholder="e.g. Interstellar, Attack on Titan"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <button type="submit" className="button">
        Get Recommendations
      </button>
    </form>
  )
}
