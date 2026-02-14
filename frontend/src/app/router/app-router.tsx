import { createBrowserRouter } from 'react-router-dom'
import {
  TravelsPlannedPage,
  TravelsPastPage,
  TravelsArchivePage,
  TravelDetailPage,
  TravelDiaryPage
} from '@pages/travels'
import { LoginPage, LoginCallbackPage } from '@pages/login'
import { AppLayout } from '../layouts/app-layout'
import { API_BASE_URL } from '@/shared/api'
import { ProtectedRoute } from './ProtectedRoute'
import { TravelDetailed } from '@/entities/travel/model/types'
import { TravelLayout } from '../layouts/TravelLayout'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/login/callback/:provider',
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
                    element: <TravelLayout />,
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
                    },
                    children: [
                      {
                        index: true,
                        element: <TravelDetailPage />
                      },
                      {
                        path: 'diary',
                        element: <TravelDiaryPage />
                      }
                    ]
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
