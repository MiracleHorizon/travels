export interface CountryName {
  common?: string
  official?: string
}

export interface CountryCurrency {
  code?: string
  name?: string
  symbol?: string
}

export interface CountryLanguage {
  name?: string
}

export interface CountryFlag {
  emoji?: string
}

export interface CountryInfo {
  name?: CountryName
  capital?: string[]
  currencies?: CountryCurrency[]
  population?: number
  flag?: CountryFlag
  languages?: CountryLanguage[]
}
