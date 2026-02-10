import { LucideIcon } from 'lucide-react'

export type ChecklistItemPriority = 'normal' | 'high'

export type ChecklistCategoryType =
  | 'before'
  | 'documents'
  | 'money'
  | 'health'
  | 'electronics'
  | 'cosmetics'
  | 'clothes'
  | 'other'

export interface ChecklistItemModel {
  id: string
  text: string
  completed: boolean
  priority: ChecklistItemPriority
  categoryId: string
  createdAt: string
}

export interface ChecklistCategoryModel {
  id: string
  name: string
  type: ChecklistCategoryType
  icon: LucideIcon
  items: ChecklistItemModel[]
}

export interface TravelChecklist {
  travelId: string
  categories: ChecklistCategoryModel[]
}
