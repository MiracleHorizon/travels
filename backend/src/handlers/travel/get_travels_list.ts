import type { BunRequest } from 'bun'
import { postgres } from '../../database'

export const getTravelsListHandler = async (req: BunRequest) => {
  try {
    const url = new URL(req.url)
    const status = url.searchParams.get('status') ?? undefined
    const archivedParam = url.searchParams.get('archived')
    const archived =
      archivedParam === 'true' ? true : archivedParam === 'false' ? false : undefined

    const conditions: string[] = []
    const params: unknown[] = []

    if (status === 'past') {
      conditions.push('start_date < CURRENT_DATE')
    } else if (status === 'upcoming') {
      conditions.push('start_date >= CURRENT_DATE')
    }

    // Архивные путешествия возвращаем только если явно запрошены
    if (archived === true) {
      conditions.push(`is_archived = $${params.length + 1}`)
      params.push(true)
    } else {
      // По умолчанию показываем только неархивные
      conditions.push(`is_archived = $${params.length + 1}`)
      params.push(false)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const query = `SELECT * FROM travels ${whereClause} ORDER BY created_at ASC`

    const travels = await postgres.unsafe(query, params)

    return new Response(JSON.stringify(travels))
  } catch (error) {
    console.error('Error fetching travels:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch travels' }), {
      status: 500
    })
  }
}
