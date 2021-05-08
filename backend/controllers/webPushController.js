import asyncHandler from 'express-async-handler'
import webpush from 'web-push'
import Subscription from '../models/subscriptionModel.js'

//Web Push Config
webpush.setVapidDetails(
  'mailto:yassineldeeb94@gmail.com',
  'BNMzl3E6hRv3v8jfYKxBAECnpCgbCSjFELufcd7sD6M8xMFhJoMj-l7gwJ2j96qm9T9YEKVSaeqWOWOA0eWFMLk',
  'Etwb3VDgxXr7eF6uXLuRgqg8FBVy79AkjCJ-8Uj9Lw0'
)

const testData = {
  title: 'PlayStation®5',
  body:
    'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.',
  icon: 'https://sickmarket.ml/uploads/upload-1618650936223.jpeg',

  url: 'https://sickmarket.ml/products/607aa7384304c02b202d9e8c',
}

const run = async () => {
  const subscriptions = await Subscription.find({})
  subscriptions.forEach((subscription) => {
    webpush
      .sendNotification(subscription, JSON.stringify(testData))
      .catch((err) => console.error(err))
  })
}

const register = asyncHandler(async (req, res) => {
  const subscription = req.body
  const exist = await Subscription.findOne({ endpoint: subscription.endpoint })

  if (exist) {
    res.status(400)
    throw new Error('User already Registered!')
  }
  if (subscription) {
    const newSubscription = new Subscription(subscription)
    await newSubscription.save()
  }

  res.send()

  // sendNotification can only take a string as it's second parameter
  run()
})

const unRegister = asyncHandler((req, res) => {
  res.send()
})

export { register, unRegister }
