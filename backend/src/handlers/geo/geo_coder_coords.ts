import type { BunRequest } from 'bun'
import {
  extractComponentsFromGeocoderResponse,
  YANDEX_GEOCODER_API_KEY,
  YANDEX_GEOCODER_API_URL,
  type GeocoderKind,
  type GeocoderResponse
} from '../../domains/geo'

interface GetGeoCoderCoordsBody {
  lng: number
  lat: number
  // Они только для фильтрации результатов, в запрос не отправляем.
  kinds: GeocoderKind[]
}

export const getGeoCoderCoordsHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as GetGeoCoderCoordsBody
    const { lng, lat } = body

    if (!lng || !lat) {
      return new Response(JSON.stringify({ error: 'Lng and lat are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const searchParams = new URLSearchParams({
      apikey: YANDEX_GEOCODER_API_KEY,
      geocode: `${lng},${lat}`,
      format: 'json'
    })

    const response = await fetch(`${YANDEX_GEOCODER_API_URL}/?${searchParams.toString()}`)

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to get geo coder coords' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const data = (await response.json()) as GeocoderResponse
    const components = extractComponentsFromGeocoderResponse(data, body.kinds)

    return new Response(
      JSON.stringify({
        components,
        coords: {
          lng,
          lat
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to get geo coder coords' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
