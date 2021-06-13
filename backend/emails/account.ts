import dotenv from 'dotenv'
import SecretCode from '../models/secretCode'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

dotenv.config()

const sendVerificationEmail = async (email: any, name: any) => {
  const code = await SecretCode.findOne({ email })
  // Generate test SMTP service account from ethereal.email
  let transporter = nodemailer.createTransport({
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    service: 'gmail',
  })
  let mailOptions = {
    from: 'yassineldeeb94@gmail.com',
    to: email,
    subject: `Sick Market ${name} Email Verifcation Code`,
    html: `Verification code is ${code}`,
  }
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
}

const sendResetPasswordEmail = async (email: any) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '600000',
    })
    // Generate test SMTP service account from ethereal.email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    })

    let mailOptions = {
      from: 'yassineldeeb94@gmail.com',
      to: email,
      subject: `Sick Market Reset Password`,
      html: `Sick Market, You've 10 minutes for the Link before it expires, Follow the Link: <a href="${
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : 'https://sickmarket.ml'
      }/resetPassword?token=${token}">Reset Password</a>`,
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log('Error ' + err)
      } else {
        console.log('Email sent successfully')
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const orderPlaced = asyncHandler(async (order: any, email: any) => {
  // Generate test SMTP service account from ethereal.email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  })
  let mailOptions = {
    from: 'yassineldeeb94@gmail.com',
    to: email,
    subject: `Sick Market Order Placed`,
    html: `Sick Market, You've Placed an Order with an ID of ${
      order._id
    }, which contains ${order.orderItems.map((each: any) => {
      return `<img src=${'https://sickmarket.ml' + each.image} />`
    })}`,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
    }
  })
})

export { sendVerificationEmail, sendResetPasswordEmail, orderPlaced }
