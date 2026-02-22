import { createContext, useContext, useCallback, ReactNode, useMemo } from 'react'
import { useSettingsQuery } from '../api/useSettingsQuery'
import type { UserSettings } from './types'

interface SettingsContextValue {
  getSetting: <K extends keyof UserSettings>(key: K) => UserSettings[K]
}

interface SettingsProviderProps {
  children: ReactNode
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { data: settings } = useSettingsQuery()

  const getSetting = useCallback(
    <K extends keyof UserSettings>(key: K) => {
      return settings[key]
    },
    [settings]
  )

  const value = useMemo(() => {
    return {
      getSetting
    }
  }, [getSetting])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)

  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider')
  }

  return ctx
}
