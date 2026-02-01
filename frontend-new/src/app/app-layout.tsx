import { SidebarProvider, SidebarTrigger } from '@/shared/ui'
import { AppSidebar } from '@/widgets/AppSidebar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='p-4'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
