import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/shared/ui'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useSettings } from '../model/SettingsContext'
import { SettingsForm } from './SettingsForm'

const SettingsDialog = () => {
  const hideModal = useHideModal()

  const { getSetting, updateSetting } = useSettings()
  const [draft, setDraft] = useState(() => ({
    measurementUnit: getSetting('measurementUnit'),
    timeFormat: getSetting('timeFormat')
  }))

  const handleSave = () => {
    updateSetting('measurementUnit', draft.measurementUnit)
    updateSetting('timeFormat', draft.timeFormat)
    hideModal()
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Подстройте приложение под себя — как вам удобнее видеть данные и интерфейс
          </DialogDescription>
        </DialogHeader>

        <SettingsForm value={draft} onChange={setDraft} />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary'>
              Закрыть
            </Button>
          </DialogClose>
          <Button size='sm' onClick={handleSave}>
            Сохранить
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
