import { ReactNode } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from './dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

interface DropdownActionItem {
  type: 'item'
  label: string
  icon?: ReactNode
  variant?: 'default' | 'destructive'
  onClick: () => void
}

interface DropdownActionSeparator {
  type: 'separator'
}

export type DropdownAction = DropdownActionItem | DropdownActionSeparator

interface DropdownActionsProps {
  trigger: ReactNode
  actions: DropdownAction[]
  onOpenChange?: (open: boolean) => void
}

export const DropdownActions = ({ trigger, actions, onOpenChange }: DropdownActionsProps) => {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='bottom'>Действия</TooltipContent>
      </Tooltip>

      <DropdownMenuContent>
        {actions.map((action, index) => {
          if (action.type === 'item') {
            return (
              <DropdownMenuItem {...action} key={action.label}>
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            )
          }

          if (action.type === 'separator') {
            return <DropdownMenuSeparator key={action.type + index} />
          }

          return null
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
