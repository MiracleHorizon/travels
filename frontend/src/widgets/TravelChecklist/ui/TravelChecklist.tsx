import { ListChecks, Plus } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Progress,
  Separator,
  TooltipComposer
} from '@/shared/ui'
import { useChecklistState } from '../model/useChecklistState'
import { ChecklistCategory, ChecklistItem } from '@/entities/checklist'
import { useAddChecklistCategoryAction } from '@/features/checklist/add-category'

interface TravelChecklistProps {
  travelId: string
}

export const TravelChecklist = ({ travelId }: TravelChecklistProps) => {
  const { categories, toggleItem, deleteItem, getTotalStats } = useChecklistState(travelId)
  const { addChecklistCategory } = useAddChecklistCategoryAction()
  const { total, completed } = getTotalStats()

  return (
    <Card>
      <CardContent className='group'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-lg font-semibold flex items-center gap-2'>
            <ListChecks className='size-5' />
            Чеклист
          </CardTitle>

          <TooltipComposer content='Добавить категорию'>
            <Button
              variant='outline'
              size='icon-sm'
              onClick={addChecklistCategory}
              className='opacity-0 group-hover:opacity-100 transition-opacity'
            >
              <Plus />
            </Button>
          </TooltipComposer>
        </div>

        {total > 0 && <Progress value={(completed / total) * 100} className='mt-4' />}
        <Separator className='mt-6' />

        <div className='space-y-1 mt-4 -mx-1'>
          {categories.map((category, index) => (
            <ChecklistCategory
              key={category.id}
              name={category.name}
              items={category.items}
              icon={category.icon}
              defaultOpen={index === 0}
              renderItem={item => (
                <ChecklistItem
                  key={item.id}
                  text={item.text}
                  completed={item.completed}
                  priority={item.priority}
                  onToggle={() => toggleItem(item.id)}
                  onDelete={() => deleteItem(item.id)}
                />
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
