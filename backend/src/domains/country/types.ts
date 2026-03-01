interface CountryNativeName {
  lang: string
  official: string
  common: string
}

interface CountryName {
  common: string
  official: string
  nativeName: CountryNativeName[]
}

interface CountryLanguage {
  iso639_1: string | null
  iso639_2: string
  name: string
  nativeName: string | null
}

interface CountryTranslation {
  lang: string
  official: string
  common: string
}

interface CountryIdd {
  root: string
  suffixes: string[]
}

interface CountryCapitalInfo {
  latlng: [number, number]
}

interface CountryGeolocation {
  latitude: number
  longitude: number
}

interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

interface CountryGdp {
  total: number
  perCapita: number
}

interface CountryGini {
  year: string
  value: number
}

interface CountryGovernmentLeader {
  title: string
  name: string
}

interface CountryGovernment {
  type: string
  leaders: CountryGovernmentLeader[]
}

interface CountryFlag {
  svg: string
  png: string
  alt: string
  emoji: string
}

interface CountryCoatOfArms {
  svg: string
  png: string
}

interface CountryMaps {
  googleMaps: string
  openStreetMaps: string
}

interface CountryCar {
  signs: string[]
  side: 'left' | 'right'
}

interface CountryPostalCode {
  format: string | null
  regex: string | null
}

interface CountryDemonym {
  lang: string
  male: string
  female: string
}

interface CountryReligion {
  name: string
  percentage: number
  population: number
}

interface CountryEthnicity {
  name: string
  percentage: number
}

interface CountryRegionalBloc {
  acronym: string
  name: string
  otherNames: string[]
}

export interface CountryInfo {
  name: CountryName
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  cioc: string | null
  fifa: string | null
  independent: boolean
  status: string
  unMember: boolean
  sovereignState: string
  currencies: CountryCurrency[]
  idd: CountryIdd
  callingCodes: string[]
  capital: string[]
  capitalInfo: CountryCapitalInfo
  altSpellings: string[]
  region: string
  subregion: string
  continents: string[]
  languages: CountryLanguage[]
  translations: CountryTranslation[]
  geolocation: CountryGeolocation
  landlocked: boolean
  borders: string[]
  area: number
  flag: CountryFlag
  demonyms: CountryDemonym[]
  coatOfArms: CountryCoatOfArms
  population: number
  maps: CountryMaps
  gini: CountryGini[]
  car: CountryCar
  postalCode: CountryPostalCode
  startOfWeek: string
  timezones: string[]
  regionalBlocs: CountryRegionalBloc[]
  religion: CountryReligion[]
  ethnicity: CountryEthnicity[]
  government: CountryGovernment
  density: number
  gdp: CountryGdp
  nationalHoliday: string
  anthem: string
  hdi: number
}

export type CountryField = keyof CountryInfo
