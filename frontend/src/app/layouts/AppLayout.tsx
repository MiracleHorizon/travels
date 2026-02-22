import { SidebarInset, SidebarProvider, Toaster } from '@/shared/ui'
import { AppSidebar, AppSidebarTrigger } from '@/widgets/AppSidebar'
import { AppToolbar } from '@/widgets/AppToolbar'
import { ModalProvider, ModalsContainer } from '@/shared/lib/modal'
import { SettingsProvider } from '@/features/settings'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SettingsProvider>
      <ModalProvider>
        <ModalsContainer />

        <SidebarProvider>
          <Toaster />
          <AppSidebar variant='inset' collapsible='offcanvas' />

          <SidebarInset>
            <AppToolbar sidebarTrigger={<AppSidebarTrigger />} />
            <main className='p-4 flex-1'>
              <Outlet />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ModalProvider>
    </SettingsProvider>
  )
}
