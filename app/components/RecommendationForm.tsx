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
    <form 
      onSubmit={handleSubmit} 
      className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
    >
      <div>
        <label className="block text-lg font-semibold mb-2">What are you looking for?</label>
        <select
          className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
        </select>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Choose a genre:</label>
        <input
          type="text"
          placeholder="e.g. Action, Comedy, Sci-Fi"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Or enter a title you already love:</label>
        <input
          type="text"
          placeholder="e.g. Interstellar, Attack on Titan"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow-md transition"
      >
        Get Recommendations
      </button>
    </form>
  )
}
