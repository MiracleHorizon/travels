import { ThemeProvider } from '@/entities/theme'
import { ModalProvider, ModalsContainer } from '@/shared/lib'
import { RouterProvider } from 'react-router-dom'
import { router } from './app-router'

export const App = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <ModalsContainer />
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  )
}
