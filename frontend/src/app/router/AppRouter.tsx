import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '../layouts/AppLayout'
import { TravelLayout } from '../layouts/TravelLayout'
import { ProtectedRoute } from './ProtectedRoute'

import {
  TravelsPlannedPage,
  TravelsPastPage,
  TravelsArchivePage,
  TravelDetailPage,
  TravelDiaryPage,
  TravelMapPage
} from '@/pages/travels'
import { LoginPage, LoginCallbackPage } from '@/pages/login'
import { API_BASE_URL } from '@/shared/api'
import { TravelDetailed } from '@/entities/travel'

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
                  breadcrumb: 'nav.travels'
                },
                children: [
                  {
                    path: 'planned',
                    element: <TravelsPlannedPage />,
                    handle: {
                      breadcrumb: 'nav.planned'
                    }
                  },
                  {
                    path: 'past',
                    element: <TravelsPastPage />,
                    handle: {
                      breadcrumb: 'nav.past'
                    }
                  },
                  {
                    path: 'archive',
                    element: <TravelsArchivePage />,
                    handle: {
                      breadcrumb: 'nav.archive'
                    }
                  },
                  {
                    path: ':travelId',
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
                        path: '',
                        element: <TravelLayout />,
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
                      },
                      {
                        path: 'map',
                        element: <TravelMapPage />,
                        handle: {
                          breadcrumb: 'nav.map'
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
    ]
  }
])
