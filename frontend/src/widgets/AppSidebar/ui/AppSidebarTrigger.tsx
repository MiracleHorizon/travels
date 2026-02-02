import { SidebarTrigger, Tooltip, TooltipContent, TooltipTrigger, useSidebar } from '@/shared/ui'

export const AppSidebarTrigger = () => {
  const { open } = useSidebar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger />
      </TooltipTrigger>
      <TooltipContent>{open ? 'Скрыть' : 'Показать'} меню</TooltipContent>
    </Tooltip>
  )
}
