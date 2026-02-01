import { createContext, ReactNode, useEffect, useState } from 'react'

import { DEFAULT_THEME, THEME_STORAGE_KEY } from './consts'
import { Theme } from './types'

interface ThemeProviderProps {
  children: ReactNode
}

interface ThemeProviderState {
  theme: Theme
  changeTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: DEFAULT_THEME,
  changeTheme: () => null,
  toggleTheme: () => null
})

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    return savedTheme ?? DEFAULT_THEME
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return root.classList.add(isDark ? 'dark' : 'light')
    }

    root.classList.add(theme)
  }, [theme])

  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProviderContext.Provider {...props} value={{ theme, changeTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
