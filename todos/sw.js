const todosApp = 'todos'
const assets = [
  '/todos/',
  '/todos/index.html',
  '/todos/style.css',
  '/todos/script.js',
  '/todos/manifest.webmanifest',
  '/todos/images/icons/icon-512x512.png',
  '/todos/images/icons/icon-384x384.png',
  '/todos/favicon.ico',
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
