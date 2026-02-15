declare global {
  interface Window {
    ymaps3: typeof ymaps3
  }
}

// TODO: Вынести код в пакет
export { YMap } from './YMap'
export { useMapInitialLocation } from './useMapInitialLocation'
export * from './consts'
