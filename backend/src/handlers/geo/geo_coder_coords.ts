import type { BunRequest } from 'bun'
import {
  extractComponentsFromGeocoderResponse,
  YANDEX_GEOCODER_API_KEY,
  YANDEX_GEOCODER_API_URL,
  toYandexGeocoderLang,
  type GeocoderKind,
  type GeocoderResponse
} from '../../domains/geo'
import type { Locale } from '../../domains/user-settings'

interface GetGeoCoderCoordsBody {
  lng: number
  lat: number
  kinds: GeocoderKind[]
  /** Локаль приложения (ru/en) для языка ответа геокодера */
  locale?: Locale
}

// https://yandex.ru/maps-api/docs/geocoder-api/quickstart.html
export const getGeoCoderCoordsHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as GetGeoCoderCoordsBody
    const { lng, lat, kinds, locale } = body

    if (!lng || !lat) {
      return new Response(
        JSON.stringify({
          error: 'Lng and lat are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    if (!kinds || !kinds.length) {
      return new Response(
        JSON.stringify({
          error: 'Kinds are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const searchParams = new URLSearchParams({
      apikey: YANDEX_GEOCODER_API_KEY,
      geocode: `${lng},${lat}`,
      format: 'json',
      lang: toYandexGeocoderLang(locale)
    })

    const response = await fetch(`${YANDEX_GEOCODER_API_URL}/?${searchParams.toString()}`)

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to get geo coder coords'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const data = (await response.json()) as GeocoderResponse
    const components = extractComponentsFromGeocoderResponse(data, kinds)

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
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Failed to get geo coder coords'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
