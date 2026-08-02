import { useModalContext } from './ModalContext'

export const ModalsContainer = () => {
  const { modals } = useModalContext()

  return modals.map(({ id, definition, props }) => {
    const Modal = definition.component

    return <Modal key={id} {...props} />
  })
}
