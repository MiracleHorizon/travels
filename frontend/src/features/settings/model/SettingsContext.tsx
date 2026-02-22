import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react'
import type { UserSettings } from './types'

const defaultSettings: UserSettings = {
  measurementUnit: 'metric',
  timeFormat: '24h'
}

interface SettingsContextValue {
  setSettings: (settings: UserSettings) => void
  getSetting: <K extends keyof UserSettings>(key: K) => UserSettings[K]
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)

  const updateSetting = useCallback(
    <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
      setSettings(prev => ({ ...prev, [key]: value }))
    },
    []
  )

  const getSetting = useCallback(
    <K extends keyof UserSettings>(key: K) => {
      return settings[key]
    },
    [settings]
  )

  const value = useMemo(
    () => ({
      setSettings,
      updateSetting,
      getSetting
    }),
    [setSettings, updateSetting, getSetting]
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)

  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider')
  }

  return ctx
}
