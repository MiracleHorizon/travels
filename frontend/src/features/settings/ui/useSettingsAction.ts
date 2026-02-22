import { useShowModal } from '@/shared/lib/modal'
import { settingsModalDefinition } from './SettingsDialog'

export const useSettingsAction = () => {
  const showModal = useShowModal()

  const openSettings = () => {
    showModal(settingsModalDefinition)
  }

  return {
    openSettings
  }
}
