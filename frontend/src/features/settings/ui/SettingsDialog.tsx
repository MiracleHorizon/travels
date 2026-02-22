import { useState } from 'react'

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

const SettingsDialog = () => {
  const hideModal = useHideModal()

  const { getSetting } = useSettings()
  const { mutate: saveSettings, isPending } = useUpdateSettingsMutation()

  const [draft, setDraft] = useState(() => ({
    measurementUnit: getSetting('measurementUnit'),
    timeFormat: getSetting('timeFormat')
  }))

  const handleSave = () => {
    saveSettings(draft, {
      onSuccess: () => {
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
            <DialogTitle>Настройки</DialogTitle>
            <DialogDescription>Подстройте приложение под себя</DialogDescription>
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
              Закрыть
            </Button>
          </DialogClose>

          {/* TODO: при добавлении rhf можно будет обновить только если форма isDirty */}
          <Button size='sm' onClick={handleSave} isLoading={isPending}>
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
