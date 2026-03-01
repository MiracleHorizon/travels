interface CountryNativeName {
  lang: string
  official: string
  common: string
}

export interface CountryName {
  common: string
  official: string
  nativeName: CountryNativeName[]
}

export interface CountryLanguage {
  iso639_1: string | null
  iso639_2: string
  name: string
  nativeName: string | null
}

export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

export interface CountryGdp {
  total: number
  perCapita: number
}

export interface CountryGini {
  year: string
  value: number
}

export interface CountryGovernmentLeader {
  title: string
  name: string
}

export interface CountryGovernment {
  type: string
  leaders: CountryGovernmentLeader[]
}

export interface CountryFlag {
  svg: string
  png: string
  alt: string
  emoji: string
}

export interface CountryMaps {
  googleMaps: string
  openStreetMaps: string
}

export interface CountryCar {
  signs: string[]
  side: 'left' | 'right'
}

export interface CountryReligion {
  name: string
  percentage: number
  population: number
}

export interface CountryEthnicity {
  name: string
  percentage: number
}

export interface CountryRegionalBloc {
  acronym: string
  name: string
  otherNames: string[]
}

export interface CountryIdd {
  root: string
  suffixes: string[]
}

export interface CountryCapitalInfo {
  latlng: [number, number]
}

export interface CountryGeolocation {
  latitude: number
  longitude: number
}

export interface CountryPostalCode {
  format: string | null
  regex: string | null
}

export interface CountryDemonym {
  lang: string
  male: string
  female: string
}

export interface CountryTranslation {
  lang: string
  official: string
  common: string
}

/**
 * Полный набор полей v4 API. Все поля опциональны —
 * API возвращает только те, что были запрошены через ?fields=
 */
export interface CountryInfo {
  name?: CountryName
  tld?: string[]
  cca2?: string
  ccn3?: string
  cca3?: string
  cioc?: string | null
  fifa?: string | null
  independent?: boolean
  status?: string
  unMember?: boolean
  sovereignState?: string
  currencies?: CountryCurrency[]
  idd?: CountryIdd
  callingCodes?: string[]
  capital?: string[]
  capitalInfo?: CountryCapitalInfo
  altSpellings?: string[]
  region?: string
  subregion?: string
  continents?: string[]
  languages?: CountryLanguage[]
  translations?: CountryTranslation[]
  geolocation?: CountryGeolocation
  landlocked?: boolean
  borders?: string[]
  area?: number
  flag?: CountryFlag
  demonyms?: CountryDemonym[]
  coatOfArms?: { svg: string; png: string }
  population?: number
  maps?: CountryMaps
  gini?: CountryGini[]
  car?: CountryCar
  postalCode?: CountryPostalCode
  startOfWeek?: string
  timezones?: string[]
  regionalBlocs?: CountryRegionalBloc[]
  religion?: CountryReligion[]
  ethnicity?: CountryEthnicity[]
  government?: CountryGovernment
  density?: number
  gdp?: CountryGdp
  nationalHoliday?: string
  anthem?: string
  hdi?: number
}
