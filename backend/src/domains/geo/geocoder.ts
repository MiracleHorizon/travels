import type { GeocoderKind, GeocoderResponse } from './types'

/** Словарь: запрошенный kind → значение из ответа (только те, что найдены) */
export type GeocoderComponentsResult = Partial<Record<GeocoderKind, string>>

/**
 * Извлекает из ответа Яндекс.Геокодера значения по заданному набору kind.
 * Берётся первый (наиболее точный) результат из featureMember.
 * Для каждого kind берётся последнее вхождение в Components (наиболее точное).
 *
 * @param data — ответ geocode-maps.yandex.ru
 * @param kinds — нужные типы (например: ['locality', 'province', 'country'])
 * @returns объект kind → name для найденных; null если ответ пустой
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
