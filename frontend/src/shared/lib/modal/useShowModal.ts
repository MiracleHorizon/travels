import { useModalContext } from './ModalContext'
import type { ModalDefinition } from './types'

export const useShowModal = () => {
  const { showModal } = useModalContext()

  return function showModalWrapper<TProps = object>(
    definition: ModalDefinition<TProps>,
    props?: TProps
  ) {
    showModal(definition, props)
  }
}
