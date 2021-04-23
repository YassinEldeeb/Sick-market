import asyncHandler from 'express-async-handler'
import webpush from 'web-push'
import Subscription from '../models/subscriptionModel.js'

//Web Push Config
webpush.setVapidDetails(
  'mailto:yassineldeeb94@gmail.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)

const testData = {
  title: 'PlayStation®5',
  body:
    'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.',
  icon: 'https://sick-market.herokuapp.com/uploads/upload-1618650936223.jpeg',

  url: 'https://sick-market.herokuapp.com/products/607aa7384304c02b202d9e8c',
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
