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

type ExpenseCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'entertainment'
  | 'shopping'
  | 'other'

interface Expense {
  id: string
  travelId: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: string
  description?: string
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

interface CreateExpenseDto {
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date: string
  description?: string
}

// In-memory хранилище (в будущем можно заменить на БД)
const travels = new Map<string, Travel>()
const expenses = new Map<string, Expense>()

// Генерация UUID
function generateId(): string {
  return crypto.randomUUID()
}

// Seed данные для демонстрации
function seedData() {
  // Создаём тестовое путешествие
  const travel1: Travel = {
    id: '1',
    name: 'Париж',
    description: 'Романтическое путешествие в столицу Франции',
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    status: 'past',
    isArchived: false,
    tags: ['Европа', 'Город', 'Культура'],
    createdAt: '2024-05-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z'
  }
  travels.set(travel1.id, travel1)

  // Добавляем расходы для этого путешествия
  const expense1: Expense = {
    id: 'e1',
    travelId: '1',
    title: 'Авиабилеты',
    amount: 45000,
    currency: 'RUB',
    category: 'transport',
    date: '2024-06-01',
    description: 'Перелёт туда и обратно',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z'
  }
  expenses.set(expense1.id, expense1)

  const expense2: Expense = {
    id: 'e2',
    travelId: '1',
    title: 'Отель',
    amount: 80000,
    currency: 'RUB',
    category: 'accommodation',
    date: '2024-06-01',
    description: '9 ночей в центре города',
    createdAt: '2024-06-01T11:00:00Z',
    updatedAt: '2024-06-01T11:00:00Z'
  }
  expenses.set(expense2.id, expense2)

  const expense3: Expense = {
    id: 'e3',
    travelId: '1',
    title: 'Ужин в ресторане',
    amount: 5500,
    currency: 'RUB',
    category: 'food',
    date: '2024-06-02',
    description: 'Ужин в традиционном французском ресторане',
    createdAt: '2024-06-02T20:00:00Z',
    updatedAt: '2024-06-02T20:00:00Z'
  }
  expenses.set(expense3.id, expense3)

  const expense4: Expense = {
    id: 'e4',
    travelId: '1',
    title: 'Билеты в Лувр',
    amount: 3000,
    currency: 'RUB',
    category: 'entertainment',
    date: '2024-06-03',
    createdAt: '2024-06-03T10:00:00Z',
    updatedAt: '2024-06-03T10:00:00Z'
  }
  expenses.set(expense4.id, expense4)

  const expense5: Expense = {
    id: 'e5',
    travelId: '1',
    title: 'Сувениры',
    amount: 8000,
    currency: 'RUB',
    category: 'shopping',
    date: '2024-06-08',
    description: 'Подарки и сувениры для друзей',
    createdAt: '2024-06-08T15:00:00Z',
    updatedAt: '2024-06-08T15:00:00Z'
  }
  expenses.set(expense5.id, expense5)
}

// Инициализация seed данных
seedData()

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

    // GET /api/travels/:travelId/expenses - получить расходы путешествия
    if (path.match(/^\/api\/travels\/[^/]+\/expenses$/) && method === 'GET') {
      const travelId = path.split('/')[3]

      // Проверяем существование путешествия
      if (!travels.has(travelId)) {
        return new Response(JSON.stringify({ error: 'Travel not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      const travelExpenses = Array.from(expenses.values()).filter(
        expense => expense.travelId === travelId
      )

      return new Response(JSON.stringify(travelExpenses), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    // POST /api/travels/:travelId/expenses - создать расход
    if (path.match(/^\/api\/travels\/[^/]+\/expenses$/) && method === 'POST') {
      const travelId = path.split('/')[3]

      // Проверяем существование путешествия
      if (!travels.has(travelId)) {
        return new Response(JSON.stringify({ error: 'Travel not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      try {
        const body = (await req.json()) as CreateExpenseDto

        // Валидация
        if (!body.title || !body.amount || !body.currency || !body.category || !body.date) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
          })
        }

        const now = new Date().toISOString()
        const expense: Expense = {
          id: generateId(),
          travelId,
          title: body.title,
          amount: body.amount,
          currency: body.currency,
          category: body.category,
          date: body.date,
          description: body.description,
          createdAt: now,
          updatedAt: now
        }

        expenses.set(expense.id, expense)

        return new Response(JSON.stringify(expense), {
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

    // DELETE /api/travels/:travelId/expenses/:expenseId - удалить расход
    if (path.match(/^\/api\/travels\/[^/]+\/expenses\/[^/]+$/) && method === 'DELETE') {
      const [, , , travelId, , expenseId] = path.split('/')

      const expense = expenses.get(expenseId)

      if (!expense) {
        return new Response(JSON.stringify({ error: 'Expense not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      if (expense.travelId !== travelId) {
        return new Response(JSON.stringify({ error: 'Expense does not belong to this travel' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        })
      }

      expenses.delete(expenseId)

      return new Response(JSON.stringify({ message: 'Expense deleted' }), {
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
