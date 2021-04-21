const cacheName = 'sick-market-v10'

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
  '/static/js/0.chunk.js',
  '/static/js/0.chunk.js.map',
  '/static/js/1.chunk.js',
  '/static/js/1.chunk.js.map',
  '/static/js/2.chunk.js',
  '/static/js/2.chunk.js.map',
  '/static/js/3.chunk.js',
  '/static/js/3.chunk.js.map',
  '/static/js/4.chunk.js',
  '/static/js/4.chunk.js.map',
  '/static/js/5.chunk.js',
  '/static/js/5.chunk.js.map',
  '/static/js/6.chunk.js',
  '/static/js/6.chunk.js.map',
  '/static/js/7.chunk.js',
  '/static/js/7.chunk.js.map',
  '/static/js/8.chunk.js',
  '/static/js/8.chunk.js.map',
  '/static/js/9.chunk.js',
  '/static/js/9.chunk.js.map',
  '/static/js/10.chunk.js',
  '/static/js/10.chunk.js.map',
  '/static/js/11.chunk.js',
  '/static/js/11.chunk.js.map',
  '/static/js/12.chunk.js',
  '/static/js/12.chunk.js.map',
  '/static/js/13.chunk.js',
  '/static/js/13.chunk.js.map',
  '/static/js/main.chunk.js',
  '/static/js/main.chunk.js.map',
  '/static/js/bundle.js',
  '/static/js/bundle.js.map',
  '/static/js/vendors~main.chunk.js',
  '/static/js/vendors~main.chunk.js.map',
  '/index.html',
  '/static/media/add.a2aa1cc6.svg',
  '/static/media/addIcon.7d5d0cae.svg',
  '/static/media/arrow2.cb94948a.svg',
  '/static/media/arrow3.23420bc4.svg',
  '/static/media/cart.cab15360.svg',
  '/static/media/cartD.1554d025.svg',
  '/static/media/categories.e3002796.svg',
  '/static/media/chat.4ed27a96.svg',
  '/static/media/choose.d919257a.svg',
  '/static/media/close.eba335f9.svg',
  '/static/media/closedEye.15a1174c.svg',
  '/static/media/connect.3f659f1a.svg',
  '/static/media/customers.32d75ac5.svg',
  '/static/media/danger.52622ca6.svg',
  '/static/media/discount.c96de364.svg',
  '/static/media/discounts.803e76ca.svg',
  '/static/media/dolar.2ec29bbd.svg',
  '/static/media/edit.fecdf289.svg',
  '/static/media/emails.9a1baab5.svg',
  '/static/media/employees.a3b753a1.svg',
  '/static/media/eye.4f11633a.svg',
  '/static/media/eyeSee.d59a5283.svg',
  '/static/media/false.f18a9b04.svg',
  '/static/media/flag.e72dd475.svg',
  '/static/media/free.bed5cc90.svg',
  '/static/media/gear.38f05504.svg',
  '/static/media/gobackArrow.ba89b2e1.svg',
  '/static/media/home.dd88a8c4.svg',
  '/static/media/info.1360709b.svg',
  '/static/media/key.02c38a90.svg',
  '/static/media/lang.4a20e91e.svg',
  '/static/media/locationIcon.47133f0e.svg',
  '/static/media/noImage.e55efc5a.svg',
  '/static/media/noise.b568c4d3.gif',
  '/static/media/notAllowed.cf663d17.svg',
  '/static/media/orders.c6ff1649.svg',
  '/static/media/pen.2b3a8381.svg',
  '/static/media/products.9e7d8d15.svg',
  '/static/media/search.146173ef.svg',
  '/static/media/searchIcon.f6c87065.svg',
  '/static/media/settings.01b48110.svg',
  '/static/media/smallX.fcb8076b.svg',
  '/static/media/sort.8aebb750.svg',
  '/static/media/statistics.c19a0be9.svg',
  '/static/media/trash.4b58cd84.svg',
  '/static/media/true.7dae0780.svg',
  '/static/media/verified.8d3d4f16.svg',
  '/static/media/warningBarIcon.ba2b544c.svg',
  '/static/media/world.3d5c2a78.svg',
  '/static/media/xSign.9bac3770.svg',
]

self.addEventListener('install', (e) => {
  console.log('Service worker has been Installed')

  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets)
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
