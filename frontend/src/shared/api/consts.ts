// В dev используем relative URL — Vite проксирует /api на бэкенд (same-origin для cookie)
export const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://localhost:4200/api'
