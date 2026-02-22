import { createContext, useContext, useCallback, useEffect, ReactNode, useMemo } from 'react'
import { useSettingsQuery } from '../api/useSettingsQuery'
import type { UserSettings } from './types'
import i18n from '@/shared/config/i18n'

interface SettingsContextValue {
  getSetting: <K extends keyof UserSettings>(key: K) => UserSettings[K]
}

interface SettingsProviderProps {
  children: ReactNode
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const { data: settings } = useSettingsQuery()

  useEffect(() => {
    if (settings?.locale) {
      i18n.changeLanguage(settings.locale)
    }
  }, [settings?.locale])

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
