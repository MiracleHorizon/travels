import { SidebarTrigger, Tooltip, TooltipContent, TooltipTrigger, useSidebar } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export const AppSidebarTrigger = () => {
  const { t } = useTranslation()
  const { open } = useSidebar()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger />
      </TooltipTrigger>
      <TooltipContent>{open ? t('nav.hide') : t('nav.show')}</TooltipContent>
    </Tooltip>
  )
}
