import { CalendarCheck, CalendarClock, Archive } from 'lucide-react'

export const travelNavItems = [
  {
    title: 'Запланированные',
    url: '/travels/planned',
    icon: CalendarClock
  },
  {
    title: 'Прошедшие',
    url: '/travels/past',
    icon: CalendarCheck
  },
  {
    title: 'Архив',
    url: '/travels/archive',
    icon: Archive
  }
]
