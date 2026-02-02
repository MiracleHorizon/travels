import { useHideModal } from './useHideModal'
import { useModalContext } from './ModalContext'
import { ModalInstance } from './types'
import { createPortal } from 'react-dom'
import { ReactNode } from 'react'

const modalsRoot = document.createElement('div')
modalsRoot.id = 'modals-root'
modalsRoot.className = 'hidden'

const Portal = ({ children, container }: { children: ReactNode; container: HTMLElement }) => {
  return createPortal(children, container)
}

const ModalOverlay = ({ onClick }: { onClick: () => void }) => {
  return <div className='absolute left-0 top-0 w-full h-full z-100' onClick={onClick} />
}

const ModalContainer = ({
  stack,
  index,
  container
}: {
  stack: ModalInstance[]
  index: number
  container: HTMLDivElement
}) => {
  const hideModal = useHideModal()
  const item = stack[index]
  const Component = item.definition.component
  const next = stack[index + 1]

  const nextContainer = next && (
    <ModalContainer
      stack={stack}
      index={index + 1}
      container={container.nextSibling as HTMLDivElement}
    />
  )

  return (
    <Portal container={container}>
      <>
        {next ? null : <ModalOverlay onClick={hideModal} />}
        <div className='relative z-101'>
          <Component {...item.props} />
          {nextContainer}
        </div>
      </>
    </Portal>
  )
}

export const ModalsContainer = () => {
  const { modals } = useModalContext()
  const childCount = modals.length

  if (!modalsRoot.parentNode) {
    if (!childCount) {
      return null
    }
    document.body.appendChild(modalsRoot)
  }

  while (modalsRoot.children.length < childCount) {
    const div = document.createElement('div')
    div.className = 'relative z-50'
    modalsRoot.appendChild(div)
  }

  for (let i = 0; i < modalsRoot.children.length; i++) {
    const child = modalsRoot.children.item(i)
    if (!child) {
      continue
    }
    child.className = i < childCount ? 'absolute inset-0 z-[1000]' : 'hidden'
  }

  if (childCount) {
    modalsRoot.className = 'absoulte inset-0 z-[100]'
  } else {
    modalsRoot.className = 'hidden'
    return null
  }

  const container = modalsRoot.children.item(0) as HTMLDivElement
  return <ModalContainer stack={modals} index={0} container={container} />
}
