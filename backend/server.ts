type TravelStatus = 'upcoming' | 'past'

interface Travel {
  id: string
  destination: string
  startDate: string
  endDate: string
  status: TravelStatus
  isArchived: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface Place {
  id: string
  travelId: string
  name: string
  comment?: string
  links: string[]
  photos: string[]
  createdAt: string
  updatedAt: string
}

interface CreatePlaceDto {
  travelId: string
  name: string
  comment?: string
  links?: string[]
  photos?: string[]
}

interface UpdatePlaceDto {
  name?: string
  comment?: string
  links?: string[]
  photos?: string[]
}

interface CreateTravelDto {
  destination: string
  startDate: string
  endDate: string
  tags?: string[]
}

interface UpdateTravelDto {
  destination?: string
  startDate?: string
  endDate?: string
  isArchived?: boolean
  tags?: string[]
}

// In-memory хранилище (в будущем можно заменить на БД)
const travels = new Map<string, Travel>()
const places = new Map<string, Place>()

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

    // GET /api/travels - получить все путешествия
    if (path === '/api/travels' && method === 'GET') {
      const travelsArray = Array.from(travels.values())
      return new Response(JSON.stringify(travelsArray), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GET /api/travels/planned - получить запланированные путешествия
    if (path === '/api/travels/planned' && method === 'GET') {
      const plannedTravels = Array.from(travels.values()).filter(
        t => t.status === 'upcoming' && !t.isArchived
      )
      return new Response(JSON.stringify(plannedTravels), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GET /api/travels/past - получить прошедшие путешествия
    if (path === '/api/travels/past' && method === 'GET') {
      const pastTravels = Array.from(travels.values()).filter(
        t => t.status === 'past' && !t.isArchived
      )
      return new Response(JSON.stringify(pastTravels), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GET /api/travels/archived - получить архивированные путешествия
    if (path === '/api/travels/archived' && method === 'GET') {
      const archivedTravels = Array.from(travels.values()).filter(t => t.isArchived)
      return new Response(JSON.stringify(archivedTravels), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // GET /api/travels/:travelId/places - получить все места путешествия
    if (path.match(/^\/api\/travels\/[^/]+\/places$/) && method === 'GET') {
      const travelId = path.split('/')[3]
      const travelPlaces = Array.from(places.values()).filter(p => p.travelId === travelId)

      return new Response(JSON.stringify(travelPlaces), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
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
        if (!body.destination || !body.startDate || !body.endDate) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        const now = new Date().toISOString()
        const travel: Travel = {
          id: generateId(),
          destination: body.destination,
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
          destination: body.destination ?? travel.destination,
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

      // Удаляем все места, связанные с этим путешествием
      for (const [placeId, place] of places.entries()) {
        if (place.travelId === id) {
          places.delete(placeId)
        }
      }

      return new Response(JSON.stringify({ message: 'Travel deleted' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // GET /api/places/:id - получить одно место
    if (path.startsWith('/api/places/') && path.split('/').length === 4 && method === 'GET') {
      const id = path.split('/')[3]
      const place = places.get(id)

      if (!place) {
        return new Response(JSON.stringify({ error: 'Place not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      return new Response(JSON.stringify(place), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/places - создать место
    if (path === '/api/places' && method === 'POST') {
      try {
        const body = (await req.json()) as CreatePlaceDto

        if (!body.travelId || !body.name) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        // Проверяем, существует ли путешествие
        if (!travels.has(body.travelId)) {
          return new Response(JSON.stringify({ error: 'Travel not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        const now = new Date().toISOString()
        const place: Place = {
          id: generateId(),
          travelId: body.travelId,
          name: body.name,
          comment: body.comment,
          links: body.links || [],
          photos: body.photos || [],
          createdAt: now,
          updatedAt: now
        }

        places.set(place.id, place)

        return new Response(JSON.stringify(place), {
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

    // PUT /api/places/:id - обновить место
    if (path.startsWith('/api/places/') && path.split('/').length === 4 && method === 'PUT') {
      const id = path.split('/')[3]
      const place = places.get(id)

      if (!place) {
        return new Response(JSON.stringify({ error: 'Place not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      try {
        const body = (await req.json()) as UpdatePlaceDto

        const updatedPlace: Place = {
          ...place,
          name: body.name ?? place.name,
          comment: body.comment ?? place.comment,
          links: body.links ?? place.links,
          photos: body.photos ?? place.photos,
          updatedAt: new Date().toISOString()
        }

        places.set(id, updatedPlace)

        return new Response(JSON.stringify(updatedPlace), {
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }
    }

    // DELETE /api/places/:id - удалить место
    if (path.startsWith('/api/places/') && path.split('/').length === 4 && method === 'DELETE') {
      const id = path.split('/')[3]
      const place = places.get(id)

      if (!place) {
        return new Response(JSON.stringify({ error: 'Place not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      places.delete(id)

      return new Response(JSON.stringify({ message: 'Place deleted' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/places/upload-photo - загрузить фото (заглушка)
    if (path === '/api/places/upload-photo' && method === 'POST') {
      // В реальном приложении здесь была бы загрузка на S3/CDN
      // Сейчас просто возвращаем mock URL
      const mockUrl = `https://picsum.photos/800/600?random=${Date.now()}`

      return new Response(JSON.stringify({ url: mockUrl }), {
        status: 201,
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
