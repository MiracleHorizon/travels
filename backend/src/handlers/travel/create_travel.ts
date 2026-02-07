import { postgres } from '../../database'
import { randomUUIDv7, type BunRequest } from 'bun'

interface CreateTravelDto {
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
}

export const createTravelHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as CreateTravelDto

    // Валидация
    if (!body.name || body.name.trim().length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Name is required'
        }),
        {
          status: 400
        }
      )
    }

    if (!body.startDate || !body.endDate) {
      return new Response(
        JSON.stringify({
          error: 'Start date and end date are required'
        }),
        {
          status: 400
        }
      )
    }

    // Проверка валидности дат
    const startDate = new Date(body.startDate)
    const endDate = new Date(body.endDate)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return new Response(
        JSON.stringify({
          error: 'Invalid date format'
        }),
        {
          status: 400
        }
      )
    }

    if (startDate > endDate) {
      return new Response(
        JSON.stringify({
          error: 'Start date must be before end date'
        }),
        {
          status: 400
        }
      )
    }

    // Создание путешествия
    const travelId = randomUUIDv7()
    const travel = await postgres`
      INSERT INTO travels (id, name, description, start_date, end_date, tags, created_at, updated_at)
      VALUES (${travelId}, ${body.name.trim()}, ${body.description?.trim() || null}, ${body.startDate}, ${
        body.endDate
      }, ${body.tags || []}, NOW(), NOW()) RETURNING *`

    return new Response(JSON.stringify(travel[0]), {
      status: 201
    })
  } catch (error) {
    console.error('Error creating travel:', error)
    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      {
        status: 500
      }
    )
  }
}
