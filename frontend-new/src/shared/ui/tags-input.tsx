import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/styles/utils'
import { Button } from './button'

export interface TagsInputProps {
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function TagsInput({
  value = [],
  onChange,
  placeholder = 'Добавить тег...',
  disabled = false,
  className
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const newTag = inputValue.trim()
      if (!value.includes(newTag)) {
        onChange?.([...value, newTag])
      }
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      onChange?.(value.slice(0, -1))
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter(tag => tag !== tagToRemove))
  }

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 items-center rounded-md border border-input bg-background px-3 py-2 text-sm min-h-10',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={() => !disabled && inputRef.current?.focus()}
    >
      {value.map(tag => (
        <span
          key={tag}
          className='inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium'
        >
          <span>{tag}</span>
          <Button
            type='button'
            variant='ghost'
            size='icon-xs'
            className='h-4 w-4 p-0 hover:bg-secondary-foreground/20'
            onClick={e => {
              e.stopPropagation()
              removeTag(tag)
            }}
            disabled={disabled}
          >
            <X className='h-3 w-3' />
            <span className='sr-only'>Удалить тег</span>
          </Button>
        </span>
      ))}
      <input
        ref={inputRef}
        type='text'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        disabled={disabled}
        className='flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed'
      />
    </div>
  )
}
