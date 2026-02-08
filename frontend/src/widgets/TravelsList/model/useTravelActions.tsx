import { DropdownAction } from '@/shared/ui'
import { Archive, ArchiveRestore, Pencil, Trash } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useDeleteTravelAction } from '@/features/travel/delete'
import { useUpdateTravelAction } from '@/features/travel/update'
import { useToggleTravelArchiveAction } from '@/features/travel/archive'
import { Travel } from '@/entities/travel'

export const useTravelActions = (): ((travel: Travel) => DropdownAction[]) => {
  const deleteTravelAction = useDeleteTravelAction()
  const updateTravelAction = useUpdateTravelAction()
  const toggleArchiveAction = useToggleTravelArchiveAction()

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
        type: 'item',
        label: travel.is_archived ? 'Восстановить' : 'Архивировать',
        icon: travel.is_archived ? <ArchiveRestore /> : <Archive />,
        onClick: (ev: MouseEvent<HTMLDivElement>) => {
          ev.stopPropagation()
          toggleArchiveAction(travel.id, !travel.is_archived)
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
