import { ThemeProvider } from '@/entities/theme'
import { ModalProvider, ModalsContainer } from '@/shared/lib/modal'
import { RouterProvider } from 'react-router-dom'
import { router } from './app-router'
import { QueryProvider } from './providers/QueryProvider'

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
