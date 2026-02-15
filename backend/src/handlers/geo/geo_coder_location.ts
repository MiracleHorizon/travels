import type { BunRequest } from 'bun'
import {
  YANDEX_GEOCODER_API_KEY,
  YANDEX_GEOCODER_API_URL,
  type GeocoderKind,
  type GeocoderResponse
} from '../../domains/geo'
import {
  extractComponentsFromGeocoderResponse,
  extractLocationsFromGeocoderResponse
} from '../../domains/geo/geocoder'

interface GetGeoCoderLocationBody {
  location: string
  // Они только для фильтрации результатов, в запрос без geocoder их нет смысла передавать.
  kinds: GeocoderKind[]
}

// https://yandex.ru/maps-api/docs/geocoder-api/quickstart.html
export const getGeoCoderLocationHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as GetGeoCoderLocationBody
    const { location, kinds } = body

    if (!location) {
      return new Response(JSON.stringify({ error: 'Location is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    if (!kinds || !kinds.length) {
      return new Response(JSON.stringify({ error: 'Kinds are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const searchParams = new URLSearchParams({
      apikey: YANDEX_GEOCODER_API_KEY,
      geocode: location,
      format: 'json'
    })

    const response = await fetch(`${YANDEX_GEOCODER_API_URL}/?${searchParams.toString()}`)
    const data = (await response.json()) as GeocoderResponse
    const components = extractComponentsFromGeocoderResponse(data, kinds)
    const locations = extractLocationsFromGeocoderResponse(data)

    return new Response(
      JSON.stringify({
        components,
        locations
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to get geo coder location' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
