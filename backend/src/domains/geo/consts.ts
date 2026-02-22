import type { Locale } from '../user-settings'

export const YANDEX_GEOCODER_API_KEY = process.env.YANDEX_GEOCODER_API_KEY as string
export const YANDEX_GEOCODER_API_URL = 'https://geocode-maps.yandex.ru/v1/'

// Документация: https://yandex.ru/dev/maps/geocoder/doc/desc/concepts/language-docpage
const LOCALE_TO_YANDEX_LANG: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US'
} as const

const DEFAULT_LOCALE = 'en_US'

export const toYandexGeocoderLang = (locale: Locale | undefined): string => {
  if (!locale) {
    return DEFAULT_LOCALE
  }

  return LOCALE_TO_YANDEX_LANG[locale]
}
