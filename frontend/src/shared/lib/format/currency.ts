const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RUB: '₽',
  GBP: '£'
}

export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'ru-RU'
): string => {
  const symbol = currencySymbols[currency] || currency

  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true
  }).format(amount)

  return `${formattedAmount} ${symbol}`
}
