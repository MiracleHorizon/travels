import type { BunRequest } from 'bun'
import {
  YANDEX_GEOCODER_API_KEY,
  YANDEX_GEOCODER_API_URL,
  toYandexGeocoderLang,
  type GeocoderKind,
  type GeocoderResponse
} from '../../domains/geo'
import {
  extractComponentsFromGeocoderResponse,
  extractLocationsFromGeocoderResponse
} from '../../domains/geo/geocoder'
import type { Locale } from '../../domains/user-settings'

interface GetGeoCoderLocationBody {
  location: string
  kinds: GeocoderKind[]
  /** Локаль приложения (ru/en) для языка ответа геокодера */
  locale?: Locale
}

// https://yandex.ru/maps-api/docs/geocoder-api/quickstart.html
export const getGeoCoderLocationHandler = async (req: BunRequest) => {
  try {
    const body = (await req.json()) as GetGeoCoderLocationBody
    const { location, kinds, locale } = body

    if (!location) {
      return new Response(
        JSON.stringify({
          error: 'Location is required'
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
      geocode: location,
      format: 'json',
      lang: toYandexGeocoderLang(locale)
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
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        error: 'Failed to get geo coder location'
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
