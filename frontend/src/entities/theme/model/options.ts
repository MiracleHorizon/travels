import { Monitor, Moon, Sun } from 'lucide-react'
import type { ElementType } from 'react'

import type { Theme } from './types'

interface ThemeOption {
  value: Theme
  label: string
  icon: ElementType
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'light',
    label: 'Светлая',
    icon: Sun
  },
  {
    value: 'dark',
    label: 'Темная',
    icon: Moon
  },
  {
    value: 'system',
    label: 'Системная',
    icon: Monitor
  }
] as const
