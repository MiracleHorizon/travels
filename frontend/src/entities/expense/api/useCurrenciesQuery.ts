import { useQuery } from '@tanstack/react-query'
import type { CurrencyItem, RestCountryItem } from '../model/types'
import { CURRENCY_PRIORITY_COUNTRIES, DEFAULT_CURRENCIES } from '../model/consts'
import { countryCodeToFlag } from '@/shared/lib/format'

// TODO: Унести на бэк, чтобы были логи запросов
const RESTCOUNTRIES_URL = 'https://restcountries.com/v3.1/all'
const CURRENCIES_QUERY_KEY = 'currencies-restcountries'

export const useCurrenciesQuery = () => {
  return useQuery<CurrencyItem[]>({
    queryKey: [CURRENCIES_QUERY_KEY],
    queryFn: async () => {
      const url = new URL(RESTCOUNTRIES_URL)
      url.searchParams.append('fields', 'currencies,cca2')

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch currencies')
      }

      const data = (await response.json()) as RestCountryItem[]
      const byCode = new Map<string, CurrencyItem>()

      // Сначала проходим по всем странам и собираем валюты
      for (const country of data) {
        if (!country.currencies || typeof country.currencies !== 'object') continue
        const cca2 = country.cca2 || ''

        for (const [code, currencyData] of Object.entries(country.currencies)) {
          if (!currencyData?.name || !currencyData?.symbol) continue

          // Если валюта уже есть, проверяем приоритет
          const existing = byCode.get(code)
          const priorityCountry = CURRENCY_PRIORITY_COUNTRIES[code]

          // Добавляем / обновляем валюту если:
          // 1. Её еще нет в списке
          // 2. Текущая страна - приоритетная для этой валюты
          if (!existing || (priorityCountry && cca2 === priorityCountry)) {
            byCode.set(code, {
              code,
              name: currencyData.name,
              symbol: currencyData.symbol,
              flag: countryCodeToFlag(cca2)
            })
          }
        }
      }

      // Сортируем по коду валюты (A-Z)
      return Array.from(byCode.values()).sort((a, b) => a.code.localeCompare(b.code))
    },
    placeholderData: DEFAULT_CURRENCIES
  })
}
