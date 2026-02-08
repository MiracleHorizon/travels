import { useUser, UserCard } from '@/entities/user'
import { useLogout } from '@/features/auth/logout'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  useSidebar
} from '@/shared/ui'
import { ChevronsUpDown, LogOut } from 'lucide-react'

// Этот интерфейс не отобразится до того как будет загружен пользователь,
// поэтому мы можем быть уверены в наличии данных.
export const UserMenu = () => {
  const { data: user } = useUser()
  const { logout, isPending: isLogoutPending } = useLogout()
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <UserCard avatar={user.avatar} email={user.email} displayName={user.displayName} />

              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent side={isMobile ? 'bottom' : 'right'} align='end'>
            <DropdownMenuLabel className='p-0 font-normal'>
              <UserCard
                avatar={user.avatar}
                email={user.email}
                displayName={user.displayName}
                className='px-2 py-1.5'
              />
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout} disabled={isLogoutPending}>
              <LogOut />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
