const cacheName = 'sick-market-v2'

const assets = [
  '/',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap',
  'https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLm21lVFteOYktMqlap.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLm21lVGdeOYktMqlap.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiDyp8kv8JHgFVrJJLm21lVF9eOYktMqg.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z11lFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDz8Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z11lFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z11lFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
  '/logo192.png',
  '/manifest.json',
]

self.addEventListener('install', (e) => {
  console.log('Service worker has been Installed')

  e.waitUntil(
    fetch('/asset-manifest.json')
      .then((res) => res.json())
      .then((data) => {
        caches.open(cacheName).then((cache) => {
          console.log(Object.values(data.files))
          cache.addAll([...assets, ...Object.values(data.files)])
        })
      })
  )
})

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      )
    })
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return cacheRes || fetch(e.request)
    })
  )
})
