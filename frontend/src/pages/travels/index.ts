import { lazy } from 'react'

export { TravelsPlannedPage } from './planned'
export { TravelsPastPage } from './past'
export { TravelsArchivePage } from './archive'
export { TravelDetailPage } from './detail'

export const TravelDiaryPage = lazy(() => import('./diary/ui/TravelDiaryPage'))
