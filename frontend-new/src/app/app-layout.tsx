import { SidebarInset, SidebarProvider } from '@/shared/ui'
import { AppSidebar, AppSidebarTrigger } from '@/widgets/AppSidebar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' collapsible='offcanvas' />

      <SidebarInset>
        <main className='p-4'>
          <AppSidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
