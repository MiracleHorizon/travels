import { lazy } from 'react'

export { TravelsPlannedPage } from './planned'
export { TravelsPastPage } from './past'
export { TravelsArchivePage } from './archive'
export { TravelDetailPage } from './detail'
export { TravelMapPage } from './map'

export const TravelDiaryPage = lazy(() => import('./diary/ui/TravelDiaryPage'))
