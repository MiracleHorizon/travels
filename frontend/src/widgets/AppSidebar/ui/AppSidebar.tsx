import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()

  const { createTravel } = useCreateTravelAction()
  const { openSettings } = useSettingsAction()

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {menuGroups.map(group => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
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
                Новое путешествие
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
              Настройки
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
