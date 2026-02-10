export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string = 'ru-RU'
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true,
    style: 'currency',
    currencyDisplay: 'symbol',
    currency
  }).format(amount)
}
