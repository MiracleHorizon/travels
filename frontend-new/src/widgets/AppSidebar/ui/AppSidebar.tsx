import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/entities/theme'
import { travelNavItems } from '../model/consts'
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
  useSidebar
} from '@/shared/ui'

export const AppSidebar = () => {
  const location = useLocation()

  const { open, openMobile } = useSidebar()

  return (
    <Sidebar variant='floating' collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Путешествия</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {travelNavItems.map(item => (
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
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle compact={!open && !openMobile} />
      </SidebarFooter>
    </Sidebar>
  )
}
