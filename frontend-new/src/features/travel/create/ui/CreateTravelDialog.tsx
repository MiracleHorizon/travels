import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/shared/ui'
import { TravelForm } from '@/entities/travel'
import { useCreateTravel } from '../model/useCreateTravel'

interface CreateTravelDialogProps {
  onCreated?: () => void
}

export const CreateTravelDialog = ({ onCreated }: CreateTravelDialogProps) => {
  const { isOpen, isLoading, error, formData, setFormData, createTravel, openChange } =
    useCreateTravel({ onCreated })

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button>Новое путешествие</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новое путешествие</DialogTitle>
          <DialogDescription>
            Спланируйте незабываемое путешествие или сохраните память о прошедшем
          </DialogDescription>
        </DialogHeader>

        <TravelForm
          value={formData}
          error={error}
          disabled={isLoading}
          onChange={setFormData}
          onSubmit={createTravel}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button size='sm' variant='secondary' disabled={isLoading}>
              Отмена
            </Button>
          </DialogClose>

          <Button size='sm' onClick={createTravel} isLoading={isLoading}>
            Создать
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
