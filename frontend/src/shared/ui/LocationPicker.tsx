import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, X } from 'lucide-react'

import { Button, Input } from '@/shared/ui'
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

// TODO: Переписать этот кринж на нормальный компонент
export const LocationPicker = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  id,
  className
}: LocationPickerProps) => {
  const { t, i18n } = useTranslation()
  const resolvedPlaceholder = placeholder ?? t('locationPicker.placeholder')
  const [query, setQuery] = useState(value?.text ?? '')
  const [results, setResults] = useState<GeoLocationResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const performSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      setIsSearching(true)
      try {
        const locations = await searchLocations(q, i18n.language)
        setResults(locations)
      } finally {
        setIsSearching(false)
      }
    },
    [i18n.language]
  )

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
        <MapPin className='text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2' />
        <Input
          id={id}
          type='text'
          autoComplete='off'
          placeholder={resolvedPlaceholder}
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
          <Button
            type='button'
            size='icon-xs'
            variant='ghost'
            onClick={handleClear}
            disabled={disabled}
            className='absolute right-2 top-1/2 -translate-y-1/2'
            aria-label={t('nav.clear')}
          >
            <X />
          </Button>
        )}
      </div>

      {showDropdown && (
        <div
          className='border-input bg-popover text-popover-foreground absolute top-full z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-md border shadow-md'
          role='listbox'
        >
          {isSearching ? (
            <div className='p-3 text-center text-sm text-muted-foreground'>{t('locationPicker.searching')}</div>
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
