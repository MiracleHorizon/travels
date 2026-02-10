import { useState } from 'react'
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/shared/ui'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'

const AddChecklistCategoryDialog = () => {
  const [name, setName] = useState('')
  const hideModal = useHideModal()
  const handleSubmit = () => {
    if (name.trim()) {
      setName('')
      hideModal()
    }
  }

  return (
    <>
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
            <DialogTitle>Новая категория</DialogTitle>
          </DialogHeader>

          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>Название</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Например: Спорт'
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline' onClick={hideModal}>
                Отмена
              </Button>
            </DialogClose>

            <Button onClick={handleSubmit} disabled={!name.trim()}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const addChecklistCategoryDialogDefinition: ModalDefinition = {
  name: 'AddChecklistCategoryDialog',
  component: AddChecklistCategoryDialog
}
