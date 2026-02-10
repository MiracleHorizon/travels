import { useCurrenciesQuery } from '../api/useCurrenciesQuery'
import { DEFAULT_CURRENCIES } from './consts'
import { CurrencyItem } from './types'

export const useCurrenciesList = (): CurrencyItem[] => {
  const { data, isError } = useCurrenciesQuery()

  if (isError || !data) {
    return DEFAULT_CURRENCIES
  }

  return data
}
