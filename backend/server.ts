type TravelStatus = 'upcoming' | 'past'

interface Travel {
  id: string
  name: string
  description?: string
  startDate: string
  endDate: string
  status: TravelStatus
  isArchived: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface CreateTravelDto {
  name: string
  description?: string
  startDate: string
  endDate: string
  tags?: string[]
}

interface UpdateTravelDto {
  name?: string
  description?: string
  startDate?: string
  endDate?: string
  isArchived?: boolean
  tags?: string[]
}

// In-memory хранилище (в будущем можно заменить на БД)
const travels = new Map<string, Travel>()

// Генерация UUID
function generateId(): string {
  return crypto.randomUUID()
}

// Определение статуса путешествия на основе дат
function getTravelStatus(endDate: string): TravelStatus {
  const now = new Date()
  const end = new Date(endDate)
  return end < now ? 'past' : 'upcoming'
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

const server = Bun.serve({
  port: 4200,
  async fetch(req) {
    const url = new URL(req.url)
    const path = url.pathname
    const method = req.method

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      })
    }

    // GET /api/travels - получить путешествия с фильтрацией
    if (path === '/api/travels' && method === 'GET') {
      const status = url.searchParams.get('status') // 'upcoming' | 'past'
      const archived = url.searchParams.get('archived') // 'true' | 'false'

      let travelsArray = Array.from(travels.values())

      // Фильтр по статусу
      if (status === 'upcoming' || status === 'past') {
        travelsArray = travelsArray.filter(t => t.status === status)
      }

      // Фильтр по архивации
      if (archived === 'true') {
        travelsArray = travelsArray.filter(t => t.isArchived)
      } else if (archived === 'false') {
        travelsArray = travelsArray.filter(t => !t.isArchived)
      }

      return new Response(JSON.stringify(travelsArray), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GET /api/travels/:id - получить одно путешествие
    if (path.startsWith('/api/travels/') && path.split('/').length === 4 && method === 'GET') {
      const id = path.split('/')[3]
      const travel = travels.get(id)

      if (!travel) {
        return new Response(JSON.stringify({ error: 'Travel not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      return new Response(JSON.stringify(travel), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/travels - создать путешествие
    if (path === '/api/travels' && method === 'POST') {
      try {
        const body = (await req.json()) as CreateTravelDto

        // Валидация
        if (!body.name || !body.startDate || !body.endDate) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        const now = new Date().toISOString()
        const travel: Travel = {
          id: generateId(),
          name: body.name,
          description: body.description,
          startDate: body.startDate,
          endDate: body.endDate,
          status: getTravelStatus(body.endDate),
          isArchived: false,
          tags: body.tags || [],
          createdAt: now,
          updatedAt: now
        }

        travels.set(travel.id, travel)

        return new Response(JSON.stringify(travel), {
          status: 201,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
    }

    // PUT /api/travels/:id - обновить путешествие
    if (path.startsWith('/api/travels/') && method === 'PUT') {
      const id = path.split('/')[3]
      const travel = travels.get(id)

      if (!travel) {
        return new Response(JSON.stringify({ error: 'Travel not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      try {
        const body = (await req.json()) as UpdateTravelDto

        const newEndDate = body.endDate ?? travel.endDate
        const updatedTravel: Travel = {
          ...travel,
          name: body.name ?? travel.name,
          description: body.description ?? travel.description,
          startDate: body.startDate ?? travel.startDate,
          endDate: newEndDate,
          status: getTravelStatus(newEndDate),
          isArchived: body.isArchived ?? travel.isArchived,
          tags: body.tags ?? travel.tags,
          updatedAt: new Date().toISOString()
        }

        travels.set(id, updatedTravel)

        return new Response(JSON.stringify(updatedTravel), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
    }

    // DELETE /api/travels/:id - удалить путешествие
    if (path.startsWith('/api/travels/') && path.split('/').length === 4 && method === 'DELETE') {
      const id = path.split('/')[3]
      const travel = travels.get(id)

      if (!travel) {
        return new Response(JSON.stringify({ error: 'Travel not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      travels.delete(id)

      return new Response(JSON.stringify({ message: 'Travel deleted' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // 404 для всех остальных маршрутов
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
})

console.log(`🚀 Server running at http://localhost:${server.port}`)
