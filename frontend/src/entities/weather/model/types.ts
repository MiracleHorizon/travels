export interface OpenWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like?: number
    humidity: number
    pressure?: number
  }
  wind: {
    speed: number
    deg?: number
  }
  rain?: {
    '1h'?: number
    '3h'?: number
  }
  snow?: {
    '1h'?: number
    '3h'?: number
  }
  clouds?: {
    all: number
  }
  dt: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  name: string
  cod: number
}

export interface ForecastItem {
  dt: number
  dt_txt: string
  main: {
    temp: number
    humidity?: number
    pressure?: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  pop?: number
  rain?: {
    '3h'?: number
  }
  snow?: {
    '3h'?: number
  }
  wind?: {
    speed: number
    deg?: number
  }
}

export interface DayForecast {
  date: string
  weekday: string
  minTemperature: number
  maxTemperature: number
  icon: string
}

export interface OpenWeatherForecastResponse {
  cod: string
  list?: ForecastItem[]
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
  }
}
