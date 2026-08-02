import type { CountryInfo } from './types'

const BASE_URL = 'https://api.restcountries.com/countries/v5'
const API_KEY = process.env.RESTCOUNTRIES_API_KEY

interface RestCountriesCurrency {
  name?: string
  symbol?: string
}

interface RestCountriesCountry {
  names?: CountryInfo['name']
  capitals?: Array<{ name?: string }>
  currencies?: Record<string, RestCountriesCurrency>
  population?: number
  flag?: CountryInfo['flag']
  languages?: CountryInfo['languages']
}

interface RestCountriesResponse {
  data?: {
    objects?: RestCountriesCountry[]
  }
}

const mapCountry = (country: RestCountriesCountry): CountryInfo => ({
  name: country.names,
  capital: country.capitals?.flatMap(capital => (capital.name ? [capital.name] : [])),
  currencies: country.currencies
    ? Object.entries(country.currencies).map(([code, currency]) => ({ code, ...currency }))
    : undefined,
  population: country.population,
  flag: country.flag,
  languages: country.languages
})

export const fetchCountryByName = async (name: string): Promise<CountryInfo> => {
  if (!API_KEY) {
    throw new Error('RESTCOUNTRIES_API_KEY is not configured')
  }

  const params = new URLSearchParams({
    response_fields: 'names.common,names.official,capitals,currencies,population,flag.emoji,languages'
  })
  const response = await fetch(`${BASE_URL}/names.common/${encodeURIComponent(name)}?${params}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Country not found: ${name}`)
    }

    throw new Error(`RestCountries API error: ${response.status}`)
  }

  const data = (await response.json()) as RestCountriesResponse
  const country = data.data?.objects?.[0]

  if (!country) {
    throw new Error(`Country not found: ${name}`)
  }

  return mapCountry(country)
}
