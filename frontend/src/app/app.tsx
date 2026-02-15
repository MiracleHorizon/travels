import { RouterProvider } from 'react-router-dom'

import { router } from './router/AppRouter'
import { QueryProvider } from './providers/QueryProvider'

import { ThemeProvider } from '@/entities/theme'
import { ModalProvider, ModalsContainer } from '@/shared/lib/modal'

export const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ModalProvider>
          <ModalsContainer />
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
