import type { CountryField, CountryInfo } from './types'

const BASE_URL = 'https://restcountries.com/v4'

// https://gitlab.com/restcountries/restcountries/-/blob/master/FIELDS_V4.md
export const fetchCountryByName = async <F extends CountryField>(
  name: string,
  fields: F[]
): Promise<Pick<CountryInfo, F>> => {
  const params = new URLSearchParams({ fields: fields.join(',') })
  const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?${params}`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Country not found: ${name}`)
    }

    throw new Error(`RestCountries API error: ${response.status}`)
  }

  const data = (await response.json()) as Pick<CountryInfo, F>[]

  return data[0]
}
