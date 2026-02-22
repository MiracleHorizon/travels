import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ru from './locales/ru.json'
import en from './locales/en.json'

export const resources = {
  ru: {
    translation: ru
  },
  en: {
    translation: en
  }
} as const

const defaultLanguage = 'en'

// TODO: Протипизировать
i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false
  }
})

export default i18n
