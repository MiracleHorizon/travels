import { ThemeProvider } from '@/entities/theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './app-router'

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
