import { useCallback, useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'

import { Input } from '@/shared/ui'
import { searchLocations, type GeoLocationResult } from '@/shared/api/geo'
import { cn } from '@/shared/lib/styles/utils'

interface LocationPickerProps {
  value: GeoLocationResult | null
  onChange: (value: GeoLocationResult | null) => void
  placeholder?: string
  disabled?: boolean
  id?: string
  className?: string
}

const SEARCH_DEBOUNCE_MS = 300

export const LocationPicker = ({
  value,
  onChange,
  placeholder = 'Введите город или адрес...',
  disabled = false,
  id,
  className
}: LocationPickerProps) => {
  const [query, setQuery] = useState(value?.text ?? '')
  const [results, setResults] = useState<GeoLocationResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([])
      return
    }
    setIsSearching(true)
    try {
      const locations = await searchLocations(q)
      setResults(locations)
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    if (value) {
      const { text, coords } = value
      const displayText =
        (text ?? (coords.lat != null && coords.lng != null))
          ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
          : ''
      setQuery(displayText)
    }
  }, [value])

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      performSearch(query)
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      clearTimeout(debounceRef.current)
    }
  }, [query, performSearch])

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(ev.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (location: GeoLocationResult) => {
    onChange(location)
    setQuery(location.text)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange(null)
    setQuery('')
  }

  const showDropdown = isOpen && (results.length > 0 || isSearching)

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className='relative'>
        <MapPin className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2' />
        <Input
          id={id}
          type='text'
          autoComplete='off'
          placeholder={placeholder}
          value={query}
          onChange={ev => {
            setQuery(ev.target.value)
            setIsOpen(true)
            if (!ev.target.value) {
              onChange(null)
            }
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          className='pl-9 pr-9'
        />
        {value && (
          <button
            type='button'
            onClick={handleClear}
            disabled={disabled}
            className='text-muted-foreground hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-xs'
            aria-label='Очистить'
          >
            ×
          </button>
        )}
      </div>

      {showDropdown && (
        <div
          className='border-input bg-popover text-popover-foreground absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border shadow-md'
          role='listbox'
        >
          {isSearching ? (
            <div className='p-3 text-center text-sm text-muted-foreground'>Поиск...</div>
          ) : (
            results.map((location, index) => (
              <button
                key={`${location.text}-${index}`}
                type='button'
                role='option'
                className='hover:bg-accent focus:bg-accent w-full px-3 py-2 text-left text-sm outline-none'
                onClick={() => handleSelect(location)}
              >
                {location.text}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
