import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/config/i18n'
import './styles/main.css'
import { App } from './app'

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(error => {
      console.warn('PWA service worker registration failed', error)
    })
  })
}

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
