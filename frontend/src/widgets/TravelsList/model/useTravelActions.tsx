import { DropdownAction } from '@/shared/ui'
import { Pencil, Trash } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useDeleteTravelAction } from '@/features/travel/delete'
import { useUpdateTravelAction } from '@/features/travel/update'
import { Travel } from '@/entities/travel'

export const useTravelActions = (): ((travel: Travel) => DropdownAction[]) => {
  const deleteTravelAction = useDeleteTravelAction()
  const updateTravelAction = useUpdateTravelAction()

  return (travel: Travel) => {
    return [
      {
        type: 'item',
        label: 'Редактировать',
        icon: <Pencil />,
        onClick: (ev: MouseEvent<HTMLDivElement>) => {
          ev.stopPropagation()
          updateTravelAction(travel)
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
          deleteTravelAction(travel.id, travel.name)
        }
      }
    ]
  }
}
