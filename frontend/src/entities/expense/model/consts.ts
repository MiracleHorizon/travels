import {
  DollarSign,
  Ellipsis,
  FerrisWheel,
  Home,
  type LucideIcon,
  Plane,
  UtensilsCrossed
} from 'lucide-react'
import { countryCodeToFlag } from '@/shared/lib/format'
import type { ExpenseCategory, CurrencyItem } from './types'
import { ChartConfig } from '@/shared/ui/chart'

export const EXPENSE_CATEGORIES: Record<ExpenseCategory, string> = {
  transport: 'Транспорт',
  accommodation: 'Проживание',
  food: 'Еда',
  entertainment: 'Развлечения',
  shopping: 'Покупки',
  other: 'Прочее'
} as const

export const EXPENSE_CATEGORY_ICONS: Record<ExpenseCategory, LucideIcon> = {
  transport: Plane,
  accommodation: Home,
  food: UtensilsCrossed,
  entertainment: FerrisWheel,
  shopping: DollarSign,
  other: Ellipsis
} as const

export const EXPENSE_CHART_CATEGORIES = {
  transport: {
    label: EXPENSE_CATEGORIES.transport,
    color: 'hsl(199, 89%, 48%)'
  },
  accommodation: {
    label: EXPENSE_CATEGORIES.accommodation,
    color: 'hsl(271, 91%, 65%)'
  },
  food: {
    label: EXPENSE_CATEGORIES.food,
    color: 'hsl(25, 95%, 53%)'
  },
  entertainment: {
    label: EXPENSE_CATEGORIES.entertainment,
    color: 'hsl(330, 81%, 60%)'
  },
  shopping: {
    label: EXPENSE_CATEGORIES.shopping,
    color: 'hsl(160, 84%, 39%)'
  },
  other: {
    label: EXPENSE_CATEGORIES.other,
    color: 'hsl(220, 9%, 46%)'
  }
} as const satisfies ChartConfig

// Используем эти валюты, если запрос к API за списком валют не удался.
export const DEFAULT_CURRENCIES: CurrencyItem[] = [
  { code: 'USD', name: 'United States dollar', symbol: '$', flag: countryCodeToFlag('US') },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: countryCodeToFlag('DE') },
  { code: 'RUB', name: 'Russian ruble', symbol: '₽', flag: countryCodeToFlag('RU') },
  { code: 'GBP', name: 'British pound', symbol: '£', flag: countryCodeToFlag('GB') },
  { code: 'JPY', name: 'Japanese yen', symbol: '¥', flag: countryCodeToFlag('JP') },
  { code: 'CNY', name: 'Chinese yuan', symbol: '¥', flag: countryCodeToFlag('CN') },
  { code: 'INR', name: 'Indian rupee', symbol: '₹', flag: countryCodeToFlag('IN') },
  { code: 'TRY', name: 'Turkish lira', symbol: '₺', flag: countryCodeToFlag('TR') }
]

// [NOTE]: Это костыльное решение, чтобы показывать правильный флаг для валют.
export const CURRENCY_PRIORITY_COUNTRIES: Record<string, string> = {
  USD: 'US', // Доллар США
  EUR: 'EU', // Евро
  GBP: 'GB', // Фунт стерлингов
  JPY: 'JP', // Японская иена
  CNY: 'CN', // Китайский юань
  CHF: 'CH', // Швейцарский франк
  CAD: 'CA', // Канадский доллар
  AUD: 'AU', // Австралийский доллар
  NZD: 'NZ', // Новозеландский доллар
  RUB: 'RU', // Российский рубль
  KRW: 'KR', // Южнокорейская вона
  INR: 'IN', // Индийская рупия
  BRL: 'BR', // Бразильский реал
  MXN: 'MX', // Мексиканское песо
  ZAR: 'ZA', // Южноафриканский рэнд
  SGD: 'SG', // Сингапурский доллар
  HKD: 'HK', // Гонконгский доллар
  NOK: 'NO', // Норвежская крона
  SEK: 'SE', // Шведская крона
  DKK: 'DK', // Датская крона
  PLN: 'PL', // Польский злотый
  THB: 'TH', // Тайский бат
  IDR: 'ID', // Индонезийская рупия
  MYR: 'MY', // Малайзийский ринггит
  PHP: 'PH', // Филиппинское песо
  CZK: 'CZ', // Чешская крона
  ILS: 'IL', // Израильский шекель
  AED: 'AE', // Дирхам ОАЭ
  TRY: 'TR', // Турецкая лира
  ARS: 'AR' // Аргентинское песо
} as const
