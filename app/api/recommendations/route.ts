import { NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1-0528:free'

export async function POST(request: Request) {
  try {
    const { type, genre, title } = await request.json()

    // Construct prompt based on input (handle both genre & title given)
    let prompt = ''
    if (title && genre) {
      prompt = `Suggest top 10 ${type}s similar to the ${type} titled "${title}" in the ${genre} genre. Strictly Provide titles only, no other texts in response.`
    } else if (title) {
      prompt = `Suggest top 10 ${type}s similar to the ${type} titled "${title}". Strictly Provide titles only, no other texts in response.`
    } else if (genre) {
      prompt = `Suggest top 10 ${type}s in the ${genre} genre. Strictly Provide titles only, no other texts in response.`
    } else {
      return NextResponse.json({ error: 'Please provide a title or genre.' }, { status: 400 })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: 'You are a helpful assistant that suggests movies, series, or anime.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[OpenRouter API Error]', error)
      return NextResponse.json({ error: 'Failed to fetch suggestions.' }, { status: 500 })
    }

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''

    // Parse suggestions: remove numbering and markdown bold (**)
    const cleaned = text.replace(/^\d+[\.\)]\s*/gm, '').trim()

    const suggestions = cleaned
      .split(/\n|,/)
      .map(s => s.trim().replace(/\*\*/g, '')) // remove markdown bold
      .filter(s => s.length > 0)
      .slice(0, 10)

    return NextResponse.json({ results: suggestions, raw: text })

  } catch (error) {
    console.error('[Backend Error]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
