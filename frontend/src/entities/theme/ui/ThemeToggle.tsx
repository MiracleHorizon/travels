import { Moon, Sun, Monitor } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui'
import { useTheme } from '../model/useTheme'
import { Theme } from '../model/types'

interface ThemeToggleProps {
  compact?: boolean
}

const themeItems = [
  {
    title: 'Светлая',
    value: 'light',
    Icon: Sun
  },
  {
    title: 'Темная',
    value: 'dark',
    Icon: Moon
  },
  {
    title: 'Системная',
    value: 'system',
    Icon: Monitor
  }
] as const

export const ThemeToggle = ({ compact = false }: ThemeToggleProps) => {
  const { changeTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm'>
          <Sun className='relative h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:absolute' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:relative' />
          {!compact && 'Переключить тему'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {themeItems.map(({ value, Icon, title }) => (
          <DropdownMenuItem key={value} onClick={() => changeTheme(value as Theme)}>
            <Icon className='mr-2 h-4 w-4' />
            <span>{title}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
