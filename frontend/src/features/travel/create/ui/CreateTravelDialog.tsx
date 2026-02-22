import { useTranslation } from 'react-i18next'
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
import { TravelForm } from '@/entities/travel'
import { ModalDefinition, useHideModal } from '@/shared/lib/modal'
import { useCreateTravel } from '../model/useCreateTravel'
import { useSettings } from '@/features/settings'

const CreateTravelDialog = () => {
  const { t } = useTranslation()

  const { getSetting } = useSettings()
  const locale = getSetting('locale')

  const { isPending, formFields, setFormFields, createTravel } = useCreateTravel()
  const hideModal = useHideModal()

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
          <DialogTitle>{t('form.travel.newTitle')}</DialogTitle>
          <DialogDescription>{t('form.travel.newDescription')}</DialogDescription>
        </DialogHeader>

        <TravelForm
          locale={locale}
          values={formFields}
          disabled={isPending}
          onChange={setFormFields}
          onSubmit={createTravel}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isPending}>
              {t('form.cancel')}
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createTravel} isLoading={isPending}>
            {t('form.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const createTravelModalDefinition: ModalDefinition = {
  name: 'CreateTravelDialog',
  component: CreateTravelDialog
}
