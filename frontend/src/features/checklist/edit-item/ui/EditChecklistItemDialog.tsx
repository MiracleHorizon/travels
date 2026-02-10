import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Label,
  Toggle
} from '@/shared/ui'
import { AlertCircle } from 'lucide-react'
import type { ChecklistItem } from '@/entities/checklist'

interface EditChecklistItemDialogProps {
  item: ChecklistItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (id: string, text: string, priority: 'normal' | 'high') => void
}

export const EditChecklistItemDialog = ({
  item,
  open,
  onOpenChange,
  onSave
}: EditChecklistItemDialogProps) => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<'normal' | 'high'>('normal')

  useEffect(() => {
    if (item) {
      setText(item.text)
      setPriority(item.priority)
    }
  }, [item])

  const handleSave = () => {
    if (item && text.trim()) {
      onSave(item.id, text.trim(), priority)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать пункт</DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='item-text'>Текст</Label>
            <Input
              id='item-text'
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='Введите текст пункта'
            />
          </div>

          <div className='flex items-center gap-2'>
            <Toggle
              pressed={priority === 'high'}
              onPressedChange={pressed => setPriority(pressed ? 'high' : 'normal')}
              variant='outline'
              size='sm'
            >
              <AlertCircle className='h-4 w-4 mr-2' />
              Важно
            </Toggle>
          </div>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleSave} disabled={!text.trim()}>
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
