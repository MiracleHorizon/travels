import { CalendarCheck, CalendarClock, Archive } from 'lucide-react'

export const menuGroups = [
  {
    titleKey: 'nav.travels',
    items: [
      {
        titleKey: 'nav.planned',
        url: '/travels/planned',
        icon: CalendarClock
      },
      {
        titleKey: 'nav.past',
        url: '/travels/past',
        icon: CalendarCheck
      },
      {
        titleKey: 'nav.archive',
        url: '/travels/archive',
        icon: Archive
      }
    ]
  }
]
