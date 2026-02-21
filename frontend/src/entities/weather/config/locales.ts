/**
 * Коды языков OpenWeather API: https://openweathermap.org/api/one-call-3#multi
 */
export const OPENWEATHER_LANG: Record<WeatherLocale, string> = {
  ru: 'ru',
  en: 'en'
} as const

export type WeatherLocale = keyof typeof WEATHER_LOCALES

// TODO: i18n
export const WEATHER_LOCALES = {
  ru: {
    windDirections: ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'] as const,
    dayAbbr: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'] as const,
    today: 'Сегодня',
    feelsLike: 'ощущается как',
    forecast: 'Прогноз',
    unavailable: 'Погода недоступна'
  },
  en: {
    windDirections: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const,
    dayAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const,
    today: 'Today',
    feelsLike: 'feels like',
    forecast: 'Forecast',
    unavailable: 'Weather unavailable'
  }
} as const
