import { useCallback } from 'react'
import { useModalContext } from './ModalContext'
import { ModalDefinition } from './types'

export const useShowModal = () => {
  const { showModal } = useModalContext()

  return useCallback(
    <TProps = object>(definition: ModalDefinition<TProps>, props?: TProps) => {
      showModal(definition, props)
    },
    [showModal]
  )
}
