declare global {
  interface Window {
    ymaps3: typeof ymaps3
  }
}

// TODO: Вынести код в пакет
export { YandexMap } from './components/YandexMap'
