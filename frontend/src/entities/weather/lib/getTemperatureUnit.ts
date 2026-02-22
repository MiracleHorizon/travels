import type { TemperatureUnit, WeatherUnits } from '../config/locales'

export const getTemperatureUnit = (units: WeatherUnits): TemperatureUnit => {
  switch (units) {
    case 'metric':
      return '°C'
    case 'imperial':
      return '°F'
    default:
      return '°C'
  }
}
