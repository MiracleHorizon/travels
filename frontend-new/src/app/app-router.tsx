import { createBrowserRouter } from 'react-router-dom'
import { TravelsPlannedPage, TravelsPastPage, TravelsArchivePage } from '@pages/travels'
import { AppLayout } from './app-layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        children: [
          {
            path: 'travels/planned',
            element: <TravelsPlannedPage />
          },
          {
            path: 'travels/past',
            element: <TravelsPastPage />
          },
          {
            path: 'travels/archive',
            element: <TravelsArchivePage />
          }
        ]
      }
    ]
  }
])
