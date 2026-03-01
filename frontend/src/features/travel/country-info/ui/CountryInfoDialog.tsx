import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Loader } from '@/shared/ui'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useCountryQuery, type CountryInfo } from '@/entities/country'

interface CountryInfoDialogProps {
  countryName: string | null | undefined
}

const NA = () => {
  const { t } = useTranslation()
  return <span className='text-muted-foreground'>{t('common.noData')}</span>
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className='flex flex-col gap-3 py-2'>
    <h3 className='text-sm font-semibold uppercase tracking-wide'>{title}</h3>
    <div className='flex flex-col gap-2'>{children}</div>
  </div>
)

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className='flex justify-between gap-4 text-sm'>
    <span className='text-muted-foreground shrink-0'>{label}</span>
    <span className='text-right'>{children}</span>
  </div>
)

const formatNumber = (n: number | undefined | null) => {
  if (n == null) return null
  return new Intl.NumberFormat('en-US').format(n)
}

const CountryInfoContent = ({ country }: { country: CountryInfo }) => {
  const { t } = useTranslation()

  const currencies = country.currencies?.length
    ? country.currencies.map(c => `${c.name} (${c.symbol})`).join(', ')
    : null

  const languages = country.languages?.length ? country.languages.map(l => l.name).join(', ') : null

  return (
    <div className='flex flex-col gap-4'>
      {/* Заголовок страны */}
      <div className='flex items-center gap-2'>
        {country.flag?.emoji && <span className='text-4xl leading-none'>{country.flag.emoji}</span>}
        <div>
          <p className='font-semibold text-lg leading-tight'>{country.name?.common ?? <NA />}</p>
          {country.name?.official && country.name.official !== country.name.common && (
            <p className='text-sm text-muted-foreground'>{country.name.official}</p>
          )}
        </div>
      </div>

      {/* Основное */}
      <Section title={t('countryInfo.geography')}>
        <Row label={t('countryInfo.capital')}>
          {country.capital?.length ? country.capital.join(', ') : <NA />}
        </Row>
      </Section>

      {/* Демография */}
      <Section title={t('countryInfo.demographics')}>
        <Row label={t('countryInfo.population')}>
          {country.population ? formatNumber(country.population) : <NA />}
        </Row>
        <Row label={t('countryInfo.languages')}>{languages ?? <NA />}</Row>
      </Section>

      {/* Экономика */}
      <Section title={t('countryInfo.economy')}>
        <Row label={t('countryInfo.currencies')}>{currencies ?? <NA />}</Row>
      </Section>
    </div>
  )
}

const CountryInfoDialog = ({ countryName }: CountryInfoDialogProps) => {
  const { t } = useTranslation()
  const hideModal = useHideModal()
  const { data: country, isLoading } = useCountryQuery(countryName)

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) hideModal()
      }}
    >
      <DialogContent className='max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Globe className='size-4' />
            {t('countryInfo.title')}
          </DialogTitle>
        </DialogHeader>

        {isLoading && <Loader />}

        {!isLoading && !country && (
          <div className='flex flex-col items-center gap-2 py-6 text-center'>
            <p className='text-sm font-medium'>{t('countryInfo.unavailable')}</p>
            <p className='text-sm text-muted-foreground'>{t('countryInfo.unavailableHint')}</p>
          </div>
        )}

        {!isLoading && country && <CountryInfoContent country={country} />}
      </DialogContent>
    </Dialog>
  )
}

export const countryInfoModalDefinition: ModalDefinition<CountryInfoDialogProps> = {
  name: 'CountryInfoDialog',
  component: CountryInfoDialog
}
