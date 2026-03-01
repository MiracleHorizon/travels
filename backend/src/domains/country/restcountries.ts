import type { CountryInfo } from './types'

const BASE_URL = 'https://restcountries.com/v4'

export const fetchCountryByName = async (name: string): Promise<CountryInfo> => {
  const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Country not found: ${name}`)
    }

    throw new Error(`RestCountries API error: ${response.status}`)
  }

  const data = (await response.json()) as CountryInfo[]

  return data[0]
}
