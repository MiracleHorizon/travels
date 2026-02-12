import { useState, useEffect } from 'react'
import {
  DEFAULT_CATEGORIES,
  DEFAULT_ITEMS_BY_CATEGORY,
  getCategoryIcon,
  type ChecklistCategoryModel,
  type ChecklistItemModel
} from '@/entities/checklist'

const STORAGE_KEY = 'travel-checklist'

const generateId = () => Math.random().toString(36).substring(2, 11)

const loadChecklistFromStorage = (travelId: string): ChecklistCategoryModel[] => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${travelId}`)
    if (stored) {
      const parsed = JSON.parse(stored) as Array<ChecklistCategoryModel>
      return parsed.map(cat => ({ ...cat, icon: getCategoryIcon(cat.id) }))
    }
  } catch (error) {
    console.error('Failed to load checklist from storage:', error)
  }

  // Инициализация с дефолтными данными
  return DEFAULT_CATEGORIES.map(cat => ({
    ...cat,
    items: (DEFAULT_ITEMS_BY_CATEGORY[cat.id] || []).map(text => ({
      id: generateId(),
      text,
      completed: false,
      priority: 'normal' as const,
      categoryId: cat.id,
      createdAt: new Date().toISOString()
    }))
  }))
}

const saveChecklistToStorage = (travelId: string, categories: ChecklistCategoryModel[]) => {
  try {
    localStorage.setItem(`${STORAGE_KEY}-${travelId}`, JSON.stringify(categories))
  } catch (error) {
    console.error('Failed to save checklist to storage:', error)
  }
}

export const useChecklistState = (travelId: string) => {
  const [categories, setCategories] = useState<ChecklistCategoryModel[]>(() =>
    loadChecklistFromStorage(travelId)
  )

  useEffect(() => {
    saveChecklistToStorage(travelId, categories)
  }, [travelId, categories])

  const toggleItem = (itemId: string) => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      }))
    )
  }

  const addItem = (categoryId: string, text: string) => {
    const newItem: ChecklistItemModel = {
      id: generateId(),
      text,
      completed: false,
      priority: 'normal',
      categoryId,
      createdAt: new Date().toISOString()
    }

    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, items: [...cat.items, newItem] } : cat))
    )
  }

  const deleteItem = (itemId: string) => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.id !== itemId)
      }))
    )
  }

  const editItem = (itemId: string, text: string, priority: 'normal' | 'high') => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(item => (item.id === itemId ? { ...item, text, priority } : item))
      }))
    )
  }

  const getTotalStats = () => {
    const total = categories.reduce((sum, cat) => sum + cat.items.length, 0)
    const completed = categories.reduce(
      (sum, cat) => sum + cat.items.filter(item => item.completed).length,
      0
    )

    return { total, completed }
  }

  return {
    categories,
    toggleItem,
    addItem,
    deleteItem,
    editItem,
    getTotalStats
  }
}
