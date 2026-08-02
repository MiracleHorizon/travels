import { YANDEX_GEOCODER_API_KEY, YANDEX_GEOCODER_API_URL } from './consts'
import type { GeocoderKind, GeocoderResponse, GeoCoords } from './types'

export type GeocoderComponentsResult = Partial<Record<GeocoderKind, string>>

export interface GeocoderLocationResult {
  text: string
  coords: GeoCoords
}

/**
 * Извлекает из ответа Яндекс.Геокодера список результатов с координатами.
 * Point.pos в формате "lon lat" (longlat по умолчанию), возвращаем GeoCoords.
 */
export const extractLocationsFromGeocoderResponse = (
  data: GeocoderResponse
): GeocoderLocationResult[] => {
  const featureMember = data.response?.GeoObjectCollection?.featureMember
  if (!featureMember?.length) return []

  return featureMember
    .map(item => {
      const geoObject = item?.GeoObject
      const pos = geoObject?.Point?.pos
      const text =
        geoObject?.metaDataProperty?.GeocoderMetaData?.text ||
        geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.formatted ||
        ''

      if (!pos || !text) return null

      const parts = pos.split(/\s+/)
      const lng = parseFloat(parts[0])
      const lat = parseFloat(parts[1])

      if (isNaN(lat) || isNaN(lng)) return null

      return {
        text,
        coords: {
          lng,
          lat
        }
      }
    })
    .filter((r): r is GeocoderLocationResult => r !== null)
}

/**
 * Делает обратный геокодинг по координатам и возвращает название страны на английском.
 * Возвращает null если страна не определена или запрос завершился ошибкой.
 */
export const fetchCountryNameByCoords = async (coords: GeoCoords): Promise<string | null> => {
  try {
    const searchParams = new URLSearchParams({
      apikey: YANDEX_GEOCODER_API_KEY,
      geocode: `${coords.lng},${coords.lat}`,
      format: 'json',
      lang: 'en_US'
    })

    const response = await fetch(`${YANDEX_GEOCODER_API_URL}/?${searchParams.toString()}`)
    if (!response.ok) return null

    const data = (await response.json()) as GeocoderResponse
    const components = extractComponentsFromGeocoderResponse(data, ['country'])

    return components?.country ?? null
  } catch {
    return null
  }
}

/**
 * Извлекает из ответа Яндекс.Геокодера значения по заданному набору kind.
 * Берётся первый (наиболее точный) результат из featureMember.
 * Для каждого kind берётся последнее вхождение в Components (наиболее точное).
 *
 * @param data - ответ geocode-maps.yandex.ru
 * @param kinds - нужные типы (например: ['locality', 'province', 'country'])
 * @returns объект kind:name для найденных или null, если ответ пустой
 */
export const extractComponentsFromGeocoderResponse = (
  data: GeocoderResponse,
  kinds: GeocoderKind[]
): GeocoderComponentsResult | null => {
  const featureMember = data.response?.GeoObjectCollection?.featureMember
  if (!featureMember?.length) return null

  const components =
    featureMember[0]?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components
  if (!components?.length) return null

  const kindSet = new Set<string>(kinds)
  const result: Record<string, string> = {}

  for (const c of components) {
    if (kindSet.has(c.kind)) result[c.kind] = c.name
  }

  return (Object.keys(result).length ? result : null) as GeocoderComponentsResult | null
}
