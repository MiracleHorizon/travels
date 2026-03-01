import { withAuth } from '../../middlewares/with_auth'
import { fetchCountryByName } from '../../domains/country/restcountries'

const COUNTRY_FIELDS = ['name', 'capital', 'currencies', 'population', 'flag', 'languages'] as const

export const getCountryInfoHandler = withAuth(async req => {
  const url = new URL(req.url)
  const name = url.searchParams.get('name')

  if (!name) {
    return new Response(
      JSON.stringify({
        error: 'Country name is required'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  try {
    const data = await fetchCountryByName(name, [...COUNTRY_FIELDS])

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch country info'
    const isNotFound = message.includes('not found')

    return new Response(
      JSON.stringify({
        error: message
      }),
      {
        status: isNotFound ? 404 : 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
