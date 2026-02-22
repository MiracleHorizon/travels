import { RouterProvider } from 'react-router-dom'

import { router } from './router/AppRouter'
import { QueryProvider } from './providers/QueryProvider'

import { ThemeProvider } from '@/entities/theme'
import { ModalProvider, ModalsContainer } from '@/shared/lib/modal'
import { SettingsProvider } from '@/features/settings'

export const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <SettingsProvider>
        <ModalProvider>
          <ModalsContainer />
          <RouterProvider router={router} />
        </ModalProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
