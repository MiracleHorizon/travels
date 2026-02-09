import { useState, useRef } from 'react'
import { Button, InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/ui/dropdown-menu'
import { ChevronDown, Search } from 'lucide-react'
import { useCurrenciesList } from '../model/useCurrenciesList'
import { filterCurrencies } from '../model/filterCurrencies'
import { cn } from '@/shared/lib/styles/utils'
import { CurrencyItem } from '../model/types'

interface ExpenseCurrencySelectProps {
  /**
   * ID элемента формы
   */
  id?: string
  /**
   * Код валюты как значение поля
   * @example "KRW"
   */
  value: string
  disabled?: boolean
  onChange: (currencyCode: string) => void
}

const renderCurrencyItem = (item: CurrencyItem) => {
  return (
    <div className='flex items-center'>
      <span className='text-lg'>{item.flag}</span>
      <span className='ml-2 mr-1.5 font-mono'>{item.code}</span>
      <span className='text-s text-muted-foreground font-mono'>{item.symbol}</span>
    </div>
  )
}

export const ExpenseCurrencySelect = ({
  id,
  value,
  onChange,
  disabled
}: ExpenseCurrencySelectProps) => {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const currencies = useCurrenciesList()
  const filteredCurrencies = filterCurrencies({
    list: currencies,
    search
  })

  const selected = value ? currencies.find(item => item.code === value) : null

  const handleSelect = (currencyCode: string) => {
    onChange(currencyCode)
    setSearch('')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id={id} variant='outline' className='w-full justify-between' disabled={disabled}>
          {selected ? (
            renderCurrencyItem(selected)
          ) : (
            <span className='text-muted-foreground'>Выберите валюту</span>
          )}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='start' className='p-0'>
        {/* Секция с поиском */}
        <div className='p-1.5 border-b'>
          <InputGroup>
            <InputGroupAddon>
              <Search className='size-4' />
            </InputGroupAddon>

            <InputGroupInput
              autoFocus
              ref={inputRef}
              value={search}
              autoComplete='off'
              placeholder='Найти по названию'
              onChange={ev => setSearch(ev.target.value)}
            />
          </InputGroup>
        </div>

        {/* Список валют */}
        <div className='max-h-56 overflow-y-auto no-scrollbar space-y-1 p-1.5'>
          {filteredCurrencies.length === 0 ? (
            <p className='px-2 py-3 text-center text-sm text-muted-foreground'>Ничего не найдено</p>
          ) : (
            filteredCurrencies.map(item => (
              <DropdownMenuItem
                key={item.code}
                title={item.name}
                className={cn(value === item.code && 'bg-accent', 'py-1')}
                onClick={() => handleSelect(item.code)}
              >
                {renderCurrencyItem(item)}
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
