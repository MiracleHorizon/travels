import { createBrowserRouter } from 'react-router-dom'
import {
  TravelsPlannedPage,
  TravelsPastPage,
  TravelsArchivePage,
  TravelDetailPage
} from '@pages/travels'
import { AppLayout } from './app-layout'
import { API_BASE_URL } from '@/shared/api'

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
              },
              {
                path: ':travelId',
                element: <TravelDetailPage />,
                // TODO: Вынести это в функцию, а то стыдобища какая-то
                loader: async ({ params }) => {
                  const response = await fetch(`${API_BASE_URL}/v1/travels/${params.travelId}`)
                  if (!response.ok) {
                    throw new Error('Travel not found')
                  }
                  return response.json()
                },
                handle: {
                  breadcrumb: (data: { name: string }) => data?.name
                }
              }
            ]
          }
        ]
      }
    ]
  }
])
