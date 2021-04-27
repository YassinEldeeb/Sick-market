let url
self.addEventListener('push', (event) => {
  const data = event.data.json()
  const { title } = data

  const body = {
    body: data.body,
    icon: data.icon,
  }
  url = data.url

  event.waitUntil(self.registration.showNotification(title, body))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  if (url) event.waitUntil(clients.openWindow(url))
})
