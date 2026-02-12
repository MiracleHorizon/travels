import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button, Input } from '@/shared/ui'

interface AddChecklistItemFormProps {
  onAdd: (text: string) => void
  placeholder?: string
}

export const AddChecklistItemForm = ({ onAdd, placeholder = 'Добавить пункт...' }: AddChecklistItemFormProps) => {
  const [text, setText] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
      setIsExpanded(false)
    }
  }

  if (!isExpanded) {
    return (
      <Button
        variant='ghost'
        size='sm'
        onClick={() => setIsExpanded(true)}
        className='w-full justify-start text-muted-foreground hover:text-foreground'
      >
        <Plus className='h-4 w-4' />
        {placeholder}
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2'>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        autoFocus
        onBlur={() => {
          if (!text.trim()) {
            setIsExpanded(false)
          }
        }}
        className='flex-1'
      />
      <Button type='submit' size='sm' disabled={!text.trim()}>
        <Plus className='h-4 w-4' />
      </Button>
    </form>
  )
}
