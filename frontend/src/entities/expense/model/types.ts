export interface Expense {
  id: string
  travel_id: string
  title: string
  amount: number
  currency: string
  category: ExpenseCategory
  date?: string
  description?: string
  link?: string
}

export type ExpenseCategory =
  | 'transport'
  | 'accommodation'
  | 'food'
  | 'entertainment'
  | 'shopping'
  | 'other'

export interface RestCurrenctItem {
  /**
   * Название валюты
   * @example "South Korean won"
   */
  name: string
  /**
   * Символ валюты
   * @example "₩"
   */
  symbol: string
}

export interface RestCountryItem {
  /**
   * Код страны по стандарту ISO 3166-1 alpha-2
   * @example "KR"
   */
  cca2: string
  currencies: Record<string, RestCurrenctItem>
}

export interface CurrencyItem extends RestCurrenctItem {
  /**
   * Код валюты по стандарту ISO 4217
   * @example "KRW"
   */
  code: string
  /**
   * Эмодзи флага страны валюты
   * @example "🇰🇷"
   */
  flag: string
}
