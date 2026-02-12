import { ListChecks } from 'lucide-react'
import { Card, CardContent, CardTitle, Progress, Separator } from '@/shared/ui'
import { useChecklistState } from '../model/useChecklistState'
import { ChecklistCategory, ChecklistItem } from '@/entities/checklist'

interface TravelChecklistProps {
  travelId: string
}

// TODO: Кастомные категории
export const TravelChecklist = ({ travelId }: TravelChecklistProps) => {
  const { categories, toggleItem, deleteItem, getTotalStats } = useChecklistState(travelId)
  const { total, completed } = getTotalStats()

  return (
    <Card>
      <CardContent className='group'>
        <div className='flex items-start justify-between'>
          <CardTitle className='text-lg font-semibold flex items-center gap-2'>
            <ListChecks className='size-5' />
            Чеклист
          </CardTitle>
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
