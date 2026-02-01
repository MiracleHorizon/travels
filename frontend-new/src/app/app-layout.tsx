import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/ui'
import { AppSidebar } from '@/widgets/AppSidebar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' collapsible='offcanvas' />

      <SidebarInset>
        <main className='p-4'>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
