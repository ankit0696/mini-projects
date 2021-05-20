const todosApp = 'todos'
const assets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  './manifest.webmanifest',
  '/images/icons/icon-512x512.png',
  '/images/icons/icon-384x384.png',
  '/favicon.ico',
]

self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    caches.open(todosApp).then((cache) => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener('activate', (e) => {
  self.clients.claim()
})

self.addEventListener('fetch', (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request)
    })
  )
})
