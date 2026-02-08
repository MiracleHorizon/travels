import { createBrowserRouter } from 'react-router-dom'
import {
  TravelsPlannedPage,
  TravelsPastPage,
  TravelsArchivePage,
  TravelDetailPage
} from '@pages/travels'
import { LoginPage, LoginCallbackPage } from '@pages/login'
import { AppLayout } from '../app-layout'
import { API_BASE_URL } from '@/shared/api'
import { ProtectedRoute } from './ProtectedRoute'
import { TravelDetailed } from '@/entities/travel/model/types'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/login/callback',
    element: <LoginCallbackPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
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
                    loader: async ({ params }) => {
                      // TODO: Вынести это в функцию, а то стыдобища какая-то
                      const response = await fetch(
                        `${API_BASE_URL}/v1/travels/${params.travelId}`,
                        {
                          credentials: 'include'
                        }
                      )
                      if (!response.ok) {
                        throw new Error('Travel not found')
                      }
                      return response.json()
                    },
                    handle: {
                      breadcrumb: (data: TravelDetailed) => data.name
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
])
