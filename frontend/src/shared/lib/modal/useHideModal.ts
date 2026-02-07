import { useModalContext } from './ModalContext'

export const useHideModal = () => {
  const { hideModal } = useModalContext()

  return () => hideModal()
}
