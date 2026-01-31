import { TravelsPage } from '@/pages/travels'
import { TravelDetailPage } from '@/pages/travel-detail'
import { createWebHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/travels'
    },
    {
      path: '/travels',
      component: TravelsPage
    },
    {
      path: '/travels/:id',
      component: TravelDetailPage
    }
  ]
})
