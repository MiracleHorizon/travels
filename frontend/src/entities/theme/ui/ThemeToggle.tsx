import { Moon, Sun, Monitor } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui'
import { useTheme } from '../model/useTheme'
import { Theme } from '../model/types'

const themeItems = [
  {
    value: 'light',
    Icon: Sun,
    label: 'Светлая'
  },
  {
    value: 'dark',
    Icon: Moon,
    label: 'Темная'
  },
  {
    value: 'system',
    Icon: Monitor,
    label: 'Системная'
  }
] as const

export const ThemeToggle = () => {
  const { theme, changeTheme } = useTheme()

  const handleChangeTheme = (value: Theme) => {
    if (value) {
      changeTheme(value as Theme)
    }
  }

  return (
    <ToggleGroup
      size='sm'
      type='single'
      variant='outline'
      value={theme}
      onValueChange={handleChangeTheme}
    >
      {themeItems.map(({ value, label, Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
