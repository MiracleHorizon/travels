type PluralForm = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'

interface PluralForms {
  zero?: string
  one?: string
  two?: string
  few?: string
  many?: string
  other: string
}

/**
 * Возвращает правильную форму слова в зависимости от количества и локали
 * @param count - количество
 * @param forms - объект с формами слова для разных правил множественного числа
 * @param locale - локаль (по умолчанию 'ru')
 * @returns правильная форма слова
 *
 * @example
 * plural(1, { one: 'день', few: 'дня', many: 'дней' }) // 'день'
 * plural(2, { one: 'день', few: 'дня', many: 'дней' }) // 'дня'
 * plural(5, { one: 'день', few: 'дня', many: 'дней' }) // 'дней'
 */
export const plural = (count: number, forms: PluralForms, locale = 'ru'): string => {
  const pluralRules = new Intl.PluralRules(locale)
  const form = pluralRules.select(count) as PluralForm

  return forms[form] ?? forms.other
}
