import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const urlBase64ToUint8Array = (base64String: any) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function register(config?: any) {
  if ('serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL as string,
      window.location.href
    )
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`

      // This is running on localhost. Let's check if a service worker still exists or not.
      checkValidServiceWorker(swUrl, config)

      // Add some additional logging to localhost, pointing developers to the
      // service worker/PWA documentation.
      navigator.serviceWorker.ready.then((registration) => {
        console.log(
          'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
        )

        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          return
        }

        const convertedVapidKey = urlBase64ToUint8Array(
          'BNMzl3E6hRv3v8jfYKxBAECnpCgbCSjFELufcd7sD6M8xMFhJoMj-l7gwJ2j96qm9T9YEKVSaeqWOWOA0eWFMLk'
        )

        //

        registration.pushManager
          .getSubscription()
          .then((existedSubscription) => {
            if (existedSubscription === null) {
              console.log('No subscription detected, make a request.')
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log('New subscription added.')
                  sendSubscription(newSubscription)
                })
                .catch(async function (e) {
                  if (Notification.permission !== 'granted') {
                    console.log('Permission was not granted.')
                    try {
                      await axios.delete(
                        'http://localhost:5000/api/push/unregister'
                      )
                    } catch (err) {}
                  } else {
                    console.error(
                      'An error ocurred during the subscription process.',
                      e
                    )
                  }
                })
            } else {
              console.log('Existed subscription detected.')
              sendSubscription(existedSubscription)
            }
          })
        //
      })
    })
  }
}

const sendSubscription = async (subscription: any) => {
  try {
    await axios.post('http://localhost:5000/api/push/register', subscription)
  } catch (err) {}
}

function registerValidSW(swUrl: any, config: any) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing
        if (installingWorker == null) {
          return
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              )

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration)
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.')

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration)
              }
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error)
    })
}

function checkValidServiceWorker(swUrl: string, config: any) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response: any) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type')
      if (
        response &&
        (response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1))
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload()
          })
        })
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config)
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
      })
      .catch((error) => {
        console.error(error.message)
      })
  }
}

export function unsubscribePush() {
  navigator.serviceWorker.ready.then((registration) => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then((subscription) => {
        if (!subscription) {
          return
          //If there isn't a subscription, then there's nothing to do
        }

        subscription
          .unsubscribe()
          .then(() => axios.delete('http://localhost:5000/api/push/unregister'))
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}
