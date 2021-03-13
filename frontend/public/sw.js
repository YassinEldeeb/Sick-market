let cacheData = "appV1"
this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/main.chunk.js",
        "/static/js/7.chunk.js",
        "/static/js/15.chunk.js",
        "/static/js/29.chunk.js",
        "/static/js/bundle.js",
        "/index.html",
        "/static/media/flag.d7813b93.svg",
        "/static/media/lang.acfce8c6.svg",
        "/static/media/dolar.ab8f7c66.svg",
        "/static/media/arrow2.64493f55.svg",
        "/static/media/xSign.bc2b5e8a.svg",
        "/static/media/search.33a7eab8.svg",
        "/static/media/cart.58b07ed3.svg",
        "/logo192.png",
        "/",
      ])
    })
  )
})

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        return res
      }
    })
  )
})
