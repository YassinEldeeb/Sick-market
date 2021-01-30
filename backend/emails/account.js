import dotenv from "dotenv"
// import sgMail from "@sendgrid/mail"
import SecretCode from "../models/secretCode.js"
// import asyncHandler from "express-async-handler"
import nodemailer from "nodemailer"

dotenv.config()
// sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
//Signup new user

const sendWelcomeEmail = async (email, name) => {
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
// const sendWelcomeEmail = asyncHandler(async (email, name) => {
//   const code = await SecretCode.find({ email })
//   try {
//     await sgMail.send({
//       from: "yassineldeeb94@gmail.com",
//       to: email,
//       subject: `Sick Market ${name} Email Verifcation Code`,
//       html: `<h2>Sick Market, Verifcation Code: <h1>${code[0].code}</h1></h2>`,
//     })
//     console.info(`mail to ${email} is sent`)
//   } catch (err) {}
// })

export default sendWelcomeEmail
