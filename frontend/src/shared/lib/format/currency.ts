import { AppLocale } from '../i18n'

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  GBP: '£'
}

interface FormatCurrencyParams {
  amount: number
  currency: string
  locale: AppLocale
}

export const formatCurrency = ({ amount, currency, locale }: FormatCurrencyParams): string => {
  const symbol = currencySymbols[currency] || currency

  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount)

  return `${formattedAmount} ${symbol}`
}
