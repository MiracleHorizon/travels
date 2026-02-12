import { randomUUIDv7 } from 'bun'
import { postgres } from '../../database'
import { withAuth } from '../../middlewares/with_auth'

interface CreateNoteDto {
  date: string
  content: string
}

export const createNoteHandler = withAuth(async req => {
  const userId = req.userId

  try {
    const { travelId } = req.params
    const { date, content } = (await req.json()) as CreateNoteDto

    const travel = await postgres`
      SELECT * FROM travels 
      WHERE id = ${travelId} AND user_id = ${userId}
    `

    if (travel.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Travel not found or access denied' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const now = new Date().toISOString()
    const noteId = randomUUIDv7()

    const note =
      await postgres`INSERT INTO travel_notes (id, travel_id, date, content, created_at, updated_at) VALUES (${noteId}, ${travelId}, ${date}, ${content}, ${now}, ${now}) RETURNING *`

    return new Response(JSON.stringify(note[0]), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return new Response(JSON.stringify({ error: 'Failed to create note' }), {
      status: 500
    })
  }
})
