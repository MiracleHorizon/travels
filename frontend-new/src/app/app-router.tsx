import { createBrowserRouter } from 'react-router-dom'
import { TravelsPage } from '@pages/travels'
import { TravelsPlannedPage } from '@pages/travels-planned'
import { TravelsPastPage } from '@pages/travels-past'
import { TravelsArchivePage } from '@pages/travels-archive'
import { App } from './app'
import { AppLayout } from './app-layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <TravelsPage />
          },
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
