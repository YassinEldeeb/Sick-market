import dotenv from "dotenv"
import SecretCode from "../models/secretCode.js"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

dotenv.config()

const sendVerificationEmail = async (email, name) => {
  const code = await SecretCode.find({ email })
  // Generate test SMTP service account from ethereal.email
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  })
  let mailOptions = {
    from: "yassineldeeb94@gmail.com",
    to: email,
    subject: `Sick Market ${name} Email Verifcation Code`,
    text: `Sick Market, Verifcation Code: ${code[0].code}`,
  }
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err)
    } else {
      console.log("Email sent successfully")
    }
  })
}

const sendResetPasswordEmail = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "600000",
  })
  // Generate test SMTP service account from ethereal.email
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  })
  console.log(process.env.NODE_ENV)
  let mailOptions = {
    from: "yassineldeeb94@gmail.com",
    to: email,
    subject: `Sick Market Reset Password`,
    html: `Sick Market, Follow the Link: <a href="${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://sick-market.herokuapp.com"
    }/resetPassword?token=${token}">Reset Password</a>`,
  }

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err)
    } else {
      console.log("Email sent successfully")
    }
  })
}

export { sendVerificationEmail, sendResetPasswordEmail }
