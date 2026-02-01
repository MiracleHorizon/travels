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
            path: '/travels',
            handle: {
              breadcrumb: 'Путешествия'
            },
            children: [
              {
                path: 'planned',
                element: <TravelsPlannedPage />,
                handle: {
                  breadcrumb: 'Запланированные'
                }
              },
              {
                path: 'past',
                element: <TravelsPastPage />,
                handle: {
                  breadcrumb: 'Прошедшие'
                }
              },
              {
                path: 'archive',
                element: <TravelsArchivePage />,
                handle: {
                  breadcrumb: 'Архив'
                }
              }
            ]
          }
        ]
      }
    ]
  }
])
