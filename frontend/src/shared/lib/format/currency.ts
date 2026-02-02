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

  return `${amount.toLocaleString(locale)} ${symbol}`
}
