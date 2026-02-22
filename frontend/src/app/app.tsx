import { RouterProvider } from 'react-router-dom'

import { router } from './router/AppRouter'
import { QueryProvider } from './providers/QueryProvider'

import { ThemeProvider } from '@/entities/theme'

export const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  )
}
