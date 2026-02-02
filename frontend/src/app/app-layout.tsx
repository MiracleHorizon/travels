import { SidebarInset, SidebarProvider } from '@/shared/ui'
import { AppSidebar, AppSidebarTrigger } from '@/widgets/AppSidebar'
import { AppToolbar } from '@/widgets/AppToolbar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' collapsible='offcanvas' />

      <SidebarInset>
        <AppToolbar sidebarTrigger={<AppSidebarTrigger />} />
        <main className='p-4 flex-1'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
