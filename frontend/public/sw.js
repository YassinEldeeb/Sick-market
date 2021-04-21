self.addEventListener('install', (e) => {
  console.log('Service worker has been Installed')
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request)
    })
    // .catch(() => caches.match(''))
  )
})
