import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'

import { DEFAULT_THEME, THEME_STORAGE_KEY } from './consts'
import { Theme } from './types'

interface ThemeProviderProps {
  children: ReactNode
}

interface ThemeProviderState {
  theme: Theme
  realTheme: 'dark' | 'light'
  changeTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: DEFAULT_THEME,
  realTheme: 'dark',
  changeTheme: () => null,
  toggleTheme: () => null
})

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

    return savedTheme ?? DEFAULT_THEME
  })

  const realTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      return theme
    }
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    root.classList.add(realTheme)
  }, [realTheme])

  const changeTheme = (newTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    setTheme(newTheme)
  }

  const toggleTheme = () => {
    changeTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        changeTheme,
        toggleTheme,
        realTheme
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}
