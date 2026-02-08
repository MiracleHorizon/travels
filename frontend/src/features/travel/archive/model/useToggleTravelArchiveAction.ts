import { useToggleTravelArchive } from './useToggleTravelArchive'

export const useToggleTravelArchiveAction = () => {
  const { toggleArchive } = useToggleTravelArchive()

  return (travelId: string, isArchived: boolean) => {
    toggleArchive(travelId, isArchived)
  }
}
