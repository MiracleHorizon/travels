import { normalizeForSearch } from '@/shared/lib/string'
import { CurrencyItem } from './types'

interface FilterCurrenciesParams {
  list: CurrencyItem[]
  search: string
}

export const filterCurrencies = ({ list, search }: FilterCurrenciesParams): CurrencyItem[] => {
  const query = normalizeForSearch(search.trim())

  return list.filter(item => {
    const name = normalizeForSearch(item.name)
    const code = normalizeForSearch(item.code)

    return name.includes(query) || code.includes(query)
  })
}
