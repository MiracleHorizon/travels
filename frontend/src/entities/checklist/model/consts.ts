import {
  IdCardLanyard,
  Notebook,
  BriefcaseMedical,
  Wallet,
  Laptop,
  Shirt,
  SprayCan,
  List
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ChecklistCategoryModel } from './types'

const ICONS: Record<string, LucideIcon> = {
  before: Notebook,
  documents: IdCardLanyard,
  money: Wallet,
  health: BriefcaseMedical,
  electronics: Laptop,
  cosmetics: SprayCan,
  clothes: Shirt
}

export const getCategoryIcon = (categoryId: string): LucideIcon => ICONS[categoryId] ?? List

export const DEFAULT_CATEGORIES: Omit<ChecklistCategoryModel, 'items'>[] = [
  {
    id: 'before',
    name: 'Перед поездкой',
    type: 'before',
    icon: Notebook
  },
  {
    id: 'documents',
    name: 'Документы',
    type: 'documents',
    icon: IdCardLanyard
  },
  {
    id: 'money',
    name: 'Деньги',
    type: 'money',
    icon: Wallet
  },
  {
    id: 'health',
    name: 'Здоровье',
    type: 'health',
    icon: BriefcaseMedical
  },
  {
    id: 'electronics',
    name: 'Электроника',
    type: 'electronics',
    icon: Laptop
  },
  {
    id: 'cosmetics',
    name: 'Косметика',
    type: 'cosmetics',
    icon: SprayCan
  },
  {
    id: 'clothes',
    name: 'Одежда',
    type: 'clothes',
    icon: Shirt
  }
]

export const DEFAULT_ITEMS_BY_CATEGORY: Record<string, string[]> = {
  before: [
    'Забронировать отель',
    'Купить билеты',
    'Купить иностранную валюту',
    'Оформить страховку'
  ],
  documents: ['Паспорт', 'Виза', 'Билеты', 'Бронь отеля', 'Страховой полис', 'Водительские права'],
  money: ['Обменять валюту', 'Проверить лимиты по картам', 'Снять наличные'],
  health: [
    'Аптечка',
    'Рецептурные лекарства',
    'Обезболивающие',
    'Антисептик',
    'Пластыри',
    'Витамины'
  ],
  electronics: ['Телефон', 'Зарядные устройства', 'Powerbank', 'Наушники', 'Адаптер для розеток'],
  cosmetics: [
    'Зубная щетка и паста',
    'Шампунь',
    'Гель для душа',
    'Крем',
    'Солнцезащитный крем',
    'Дезодорант'
  ],
  clothes: ['Нижнее белье', 'Носки', 'Футболки', 'Брюки', 'Куртка', 'Обувь', 'Головной убор']
}
