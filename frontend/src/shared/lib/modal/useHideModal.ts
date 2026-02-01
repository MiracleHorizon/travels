import { useCallback } from 'react'
import { useModalContext } from './ModalContext'

export const useHideModal = () => {
  const { hideModal } = useModalContext()

  return useCallback(() => {
    hideModal()
  }, [hideModal])
}
