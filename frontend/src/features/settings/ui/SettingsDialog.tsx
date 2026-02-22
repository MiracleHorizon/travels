import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Separator
} from '@/shared/ui'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useSettings } from '../model/SettingsContext'
import { useUpdateSettingsMutation } from '../api/useUpdateSettingsMutation'
import { SettingsForm } from './SettingsForm'
import i18n from '@/shared/config/i18n'

const SettingsDialog = () => {
  const { t } = useTranslation()
  const hideModal = useHideModal()

  const { getSetting } = useSettings()
  const { mutate: saveSettings, isPending } = useUpdateSettingsMutation()

  const [draft, setDraft] = useState(() => ({
    measurementUnit: getSetting('measurementUnit'),
    timeFormat: getSetting('timeFormat'),
    locale: getSetting('locale') ?? 'ru'
  }))

  const handleSave = () => {
    saveSettings(draft, {
      onSuccess: (data) => {
        if (data.locale) {
          i18n.changeLanguage(data.locale)
        }
        hideModal()
      }
    })
  }

  return (
    <Dialog
      open
      onOpenChange={open => {
        if (!open) {
          hideModal()
        }
      }}
    >
      <DialogContent className='px-0 pb-4'>
        <div className='px-6'>
          <DialogHeader>
            <DialogTitle>{t('settings.title')}</DialogTitle>
            <DialogDescription>{t('settings.description')}</DialogDescription>
          </DialogHeader>
        </div>

        <Separator className='mb-2' />
        <div className='flex flex-col gap-6 px-6'>
          <SettingsForm value={draft} onChange={setDraft} />
        </div>
        <Separator className='mt-2' />

        <DialogFooter className='px-6 pb-0'>
          <DialogClose asChild>
            <Button size='sm' variant='secondary'>
              {t('settings.close')}
            </Button>
          </DialogClose>

          <Button size='sm' onClick={handleSave} isLoading={isPending}>
            {t('settings.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const settingsModalDefinition: ModalDefinition = {
  name: 'SettingsDialog',
  component: SettingsDialog
}
