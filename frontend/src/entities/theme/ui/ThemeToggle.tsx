import { ToggleGroup, ToggleGroupItem } from '@/shared/ui'
import { useTheme } from '../model/useTheme'
import { THEME_OPTIONS } from '../model/options'

interface ThemeToggleProps {
  withLabel?: boolean
}

export const ThemeToggle = ({ withLabel = false }: ThemeToggleProps) => {
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
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon />
          {withLabel && <span className='hidden sm:inline'>{label}</span>}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
