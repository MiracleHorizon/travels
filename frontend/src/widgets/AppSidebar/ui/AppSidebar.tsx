import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { menuGroups } from '../model/consts'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Button
} from '@/shared/ui'
import { Plus, Settings } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import { useCreateTravelAction } from '@/features/travel/create'
import { useSettingsAction } from '@/features/settings'
import { UserMenu } from './UserMenu'

export const AppSidebar = (props: ComponentPropsWithoutRef<typeof Sidebar>) => {
  const { t } = useTranslation()
  const location = useLocation()

  const { createTravel } = useCreateTravelAction()
  const { openSettings } = useSettingsAction()

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {menuGroups.map(group => (
          <SidebarGroup key={group.titleKey}>
            <SidebarGroupLabel>{t(group.titleKey)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{t(item.titleKey)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuItem className='flex items-center gap-2'>
              <Button size='sm' className='w-full' onClick={createTravel}>
                <Plus />
                {t('nav.newTravel')}
              </Button>
            </SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={openSettings}>
              <Settings />
              {t('nav.settings')}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
