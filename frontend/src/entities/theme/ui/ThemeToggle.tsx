import { ToggleGroup, ToggleGroupItem } from '@/shared/ui'
import { useTheme } from '../model/useTheme'
import { THEME_OPTIONS } from '../model/options'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, changeTheme } = useTheme()

  const handleChangeTheme = value => {
    if (value) {
      changeTheme(value)
    }
  }

  return (
    <ToggleGroup
      size='sm'
      type='single'
      variant='outline'
      value={theme}
      onValueChange={handleChangeTheme}
      className={className}
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label} className='flex-1'>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
