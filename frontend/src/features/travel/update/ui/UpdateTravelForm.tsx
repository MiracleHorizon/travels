import { TravelForm } from '@/entities/travel'
import { TravelDetailed } from '@/entities/travel'
import { DialogFooter, DialogClose, Button } from '@/shared/ui'
import { useUpdateTravel } from '../model/useUpdateTravel'

interface UpdateTravelFormProps {
  travel: TravelDetailed
}

export const UpdateTravelForm = ({ travel }: UpdateTravelFormProps) => {
  const { isPending, formFields, setFormFields, updateTravel } = useUpdateTravel({ travel })

  return (
    <>
      <TravelForm
        values={formFields}
        disabled={isPending}
        onChange={setFormFields}
        onSubmit={updateTravel}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button size='sm' variant='secondary' disabled={isPending}>
            Отмена
          </Button>
        </DialogClose>

        <Button size='sm' onClick={updateTravel} isLoading={isPending}>
          Сохранить
        </Button>
      </DialogFooter>
    </>
  )
}
