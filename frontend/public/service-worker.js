const CACHE_VERSION = 'travels-shell-v1'
const APP_SHELL = ['/', '/offline.html', '/manifest.webmanifest']

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key)))
      )
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then(cache => cache.put(request, copy))
          return response
        })
        .catch(async () => (await caches.match(request)) || (await caches.match('/offline.html')))
    )
    return
  }

  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/pwa/')) {
    event.respondWith(
      caches.match(request).then(
        cached =>
          cached ||
          fetch(request).then(response => {
            if (response.ok) {
              caches.open(CACHE_VERSION).then(cache => cache.put(request, response.clone()))
            }
            return response
          })
      )
    )
  }
})
