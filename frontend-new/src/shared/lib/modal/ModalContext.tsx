import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { ModalDefinition, ModalInstance } from './types'

interface ModalContextValue {
  modals: ModalInstance[]
  showModal: <TProps = object>(definition: ModalDefinition<TProps>, props?: TProps) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

interface ModalProviderProps {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modals, setModals] = useState<ModalInstance[]>([])

  const showModal = useCallback(
    <TProps = any,>(definition: ModalDefinition<TProps>, props?: TProps) => {
      const id = `${definition.name}-${Date.now()}-${Math.random()}`
      const newModal: ModalInstance<TProps> = {
        id,
        definition,
        props
      }
      setModals(prev => [...prev, newModal])
    },
    []
  )

  const hideModal = useCallback(() => {
    setModals(prev => prev.slice(0, -1))
  }, [])

  return (
    <ModalContext.Provider value={{ modals, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext must be used within ModalProvider')
  }

  return context
}
