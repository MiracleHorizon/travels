import { ComponentType } from 'react'

export interface ModalDefinition<TProps = object> {
  name: string
  component: ComponentType<TProps>
}

export interface ModalInstance<TProps = any> {
  id: string
  definition: ModalDefinition<TProps>
  props?: TProps
}
