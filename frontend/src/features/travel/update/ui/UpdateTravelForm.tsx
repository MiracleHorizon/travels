import { useTranslation } from 'react-i18next'
import { TravelForm } from '@/entities/travel'
import { TravelDetailed } from '@/entities/travel'
import { DialogFooter, DialogClose, Button } from '@/shared/ui'
import { useUpdateTravel } from '../model/useUpdateTravel'
import { useSettings } from '@/features/settings'

interface UpdateTravelFormProps {
  travel: TravelDetailed
}

export const UpdateTravelForm = ({ travel }: UpdateTravelFormProps) => {
  const { t } = useTranslation()

  const { getSetting } = useSettings()
  const locale = getSetting('locale')

  const { isPending, formFields, setFormFields, updateTravel } = useUpdateTravel({ travel })

  return (
    <>
      <TravelForm
        values={formFields}
        disabled={isPending}
        locale={locale}
        onChange={setFormFields}
        onSubmit={updateTravel}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button size='sm' variant='secondary' disabled={isPending}>
            {t('form.cancel')}
          </Button>
        </DialogClose>

        <Button size='sm' onClick={updateTravel} isLoading={isPending}>
          {t('form.save')}
        </Button>
      </DialogFooter>
    </>
  )
}
