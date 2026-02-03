import { DropdownAction } from '@/shared/ui'
import { Pencil, Trash } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useDeleteTravelAction } from '@/features/travel/delete'

export const useTravelActions = (): ((travelId: string, travelName: string) => DropdownAction[]) => {
  const deleteTravelAction = useDeleteTravelAction()

  const editTravel = (travelId: string) => {
    console.log('editTravel', travelId)
  }

  return (travelId: string, travelName: string) => {
    return [
      {
        type: 'item',
        label: 'Редактировать',
        icon: <Pencil />,
        onClick: (ev: MouseEvent<HTMLDivElement>) => {
          ev.stopPropagation()
          editTravel(travelId)
        }
      },
      {
        type: 'separator'
      },
      {
        type: 'item',
        label: 'Удалить',
        icon: <Trash />,
        variant: 'destructive',
        onClick: (ev: MouseEvent<HTMLDivElement>) => {
          ev.stopPropagation()
          deleteTravelAction(travelId, travelName)
        }
      }
    ]
  }
}
