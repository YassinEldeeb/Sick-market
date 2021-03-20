import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import sharp from "sharp"
import fs from "fs"
import validator from "validator"
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "../emails/account.js"
import SecretCode from "../models/secretCode.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Update canOrder USER - /api/users/:id @Admin
const canOrderUser = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error("Id is Requierd")
  }

  const user = await User.findById(req.params.id)
  user.canOrder = req.body.canOrder
  await user.save()

  const usersCopy = {
    joinedIn: user.createdAt,
    availablePic: user.availablePic,
    rank: user.rank,
    status: user.status,
    validResetPassword: user.validResetPassword,
    _id: user._id,
    name: user.name,
    email: user.email,
    totalPaidOrders: user.totalPaidOrders ? user.totalPaidOrders : 0,
    canReview: user.canReview,
    canOrder: user.canOrder,
  }

  res.send(usersCopy)
})
//Update canReview USER - /api/users/:id @Admin
const canReviewUser = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error("Id is Requierd")
  }

  const user = await User.findById(req.params.id)
  user.canReview = req.body.canReview
  await user.save()

  const usersCopy = {
    joinedIn: user.createdAt,
    availablePic: user.availablePic,
    rank: user.rank,
    status: user.status,
    validResetPassword: user.validResetPassword,
    _id: user._id,
    name: user.name,
    email: user.email,
    totalPaidOrders: user.totalPaidOrders ? user.totalPaidOrders : 0,
    canReview: user.canReview,
    canOrder: user.canOrder,
  }

  res.send(usersCopy)
})

//DELETE USER - /api/users/:id @Admin
const deleteUser = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error("Id is Requierd")
  }

  const user = await User.findById(req.params.id)

  if (user) {
    await user.delete()
  } else {
    res.status(404)
    throw new Erorr("User not found!")
  }

  res.send({ message: "User deleted" })
})

//GET USER - /api/users/:id @Admin
const getUserById = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400)
    throw new Error("Id is Requierd")
  }

  const user = await User.findOne({ _id: req.params.id, rank: "user" })

  if (user) {
    const usersCopy = {
      joinedIn: user.createdAt,
      availablePic: user.availablePic,
      rank: user.rank,
      status: user.status,
      validResetPassword: user.validResetPassword,
      _id: user._id,
      name: user.name,
      email: user.email,
      totalPaidOrders: user.totalPaidOrders ? user.totalPaidOrders : 0,
      canReview: user.canReview,
      canOrder: user.canOrder,
    }

    res.send(usersCopy)
  } else {
    res.status(404)
    throw new Error("User not Found")
  }
})

//Search USERS - /api/users/search @Admin
const searchUsers = asyncHandler(async (req, res) => {
  if (!req.body.search) {
    res.status(400)
    throw new Error("Search Field is Requierd")
  }

  const users = await User.search(
    req.body.search,
    async function (err, output) {
      const inspect = require("util").inspect
      await inspect(output, { depth: null })
    }
  )

  const filteredUsers = users.filter((user) => user.rank === "user")

  const count = filteredUsers.length

  const usersCopy = filteredUsers.map((e) => {
    return {
      joinedIn: e.createdAt,
      availablePic: e.availablePic,
      rank: e.rank,
      status: e.status,
      validResetPassword: e.validResetPassword,
      _id: e._id,
      name: e.name,
      email: e.email,
      totalPaidOrders: e.totalPaidOrders ? e.totalPaidOrders : 0,
      canReview: e.canReview,
      canOrder: e.canOrder,
    }
  })

  res.send({ users: usersCopy, count })
})

//GET all USERS - /api/users @Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    rank: "user",
  })
    .sort({ createdAt: -1 })
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))
  const count = await User.countDocuments({ rank: "user" })
  const usersCopy = users.map((e) => {
    return {
      joinedIn: e.createdAt,
      availablePic: e.availablePic,
      rank: e.rank,
      status: e.status,
      validResetPassword: e.validResetPassword,
      _id: e._id,
      name: e.name,
      email: e.email,
      totalPaidOrders: e.totalPaidOrders ? e.totalPaidOrders : 0,
      canReview: e.canReview,
      canOrder: e.canOrder,
    }
  })

  res.send({ users: usersCopy, count })
})

//Get User - /api/users/login @Public
const getUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new Error("Email & Password are Required")
  } else {
    const user = await User.findByCredentials(email, password)

    if (user) {
      res.send(user)
    } else {
      res.status(401)
    }
  }
})

//Register User - /api/users @Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicLink, status } = req.body

  const editedEmail = email ? email.toLowerCase() : null
  if (typeof name === "number") {
    res.status(400)
    throw new Error("Name must be alphabetical letters!")
  }
  if (!name || !editedEmail || !password) {
    res.status(400)
    throw new Error("name, Email and Password are Required")
  } else {
    if (!validator.isEmail(editedEmail)) {
      res.status(400)
      throw new Error("Email isn't an actual email")
    }
    const userExists = await User.findOne({ email: editedEmail })
    if (userExists) {
      res.status(400)
      throw new Error("User already exists, Login below")
    }
    const user = new User({
      name,
      email: editedEmail,
      password,
      profilePicLink: profilePicLink ? profilePicLink : null,
      status: status ? status : "pending",
    })
    const token = user.generateToken()
    user.tokens.unshift({ token })
    await user.save()

    res.status(201).send({ user, token })
  }
})

//Continue with Google
const continueWithGoogle = asyncHandler(async (req, res) => {
  const { name, email, profilePicLink, googleSignture } = req.body
  const googlePassword = process.env.REACT_APP_GOOGLE_PASSWORD
  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    const newUser = new User({
      name,
      email,
      password: googlePassword,
      profilePicLink,
      status: "Verified",
      availablePic: true,
    })
    const token = newUser.generateToken()
    newUser.tokens.unshift({ token })
    await newUser.save()
    res.status(201).send({ user: newUser, token })
  } else {
    if (googleSignture === process.env.GOOGLE_SIGNTURE) {
      const user = await User.findByCredentials(
        email,
        googlePassword,
        "googleSignin"
      )
      if (user) {
        res.send(user)
      } else {
        res.status(401)
      }
    } else {
      res.status(400)
      throw new Error("googleSignture is Required")
    }
  }
})

//Get Profile - /api/users/profile @Protected
const getProfile = asyncHandler(async (req, res) => {
  const userObj = req.user.toObject()
  delete userObj.tokens
  delete userObj.profilePic
  delete userObj.createdAt
  delete userObj.updatedAt
  delete userObj.__v
  delete userObj.password

  res.send(userObj)
})

//Patch Profile - /api/users/profile @Protected
const updateProfile = asyncHandler(async (req, res) => {
  if (!req.body.password && !req.user.profilePicLink) {
    res.status(401)
    throw new Error("Password is required to Change Profile Info")
  }
  const editedEmail = req.body.email
    ? req.body.email.toLowerCase()
    : req.user.email

  if (req.body.email) {
    const existingEmail = await User.findOne({ email: editedEmail })
    if (existingEmail && editedEmail !== req.user.email) {
      res.status(400)
      throw new Error("User with this email Exists!")
    }
  }
  const updates = Object.keys(req.body).filter((e) => e !== "password")
  const allowedUpdates = ["name", "email", "newPassword"]
  let invalidUpdates = []

  if (typeof req.body.name === "number") {
    res.status(400)
    throw new Error("Name must be alphabetical letters!")
  }
  if (
    !req.user.profilePicLink &&
    (await bcrypt.compare(req.body.password, req.user.password))
  ) {
    updates.forEach((update) => {
      if (!allowedUpdates.includes(update)) {
        invalidUpdates.push(update)
      }
    })

    //valid updates
    const validUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!validUpdates) {
      res.status(400)
      throw new Error(`Unable to update ${invalidUpdates.join(" ,")}`)
    }
    const lastPassword = req.user.password

    if (req.body.email && req.user.email !== req.body.email) {
      req.user.status = "pending"
    }
    //Valid updates
    updates.forEach((update) => (req.user[update] = req.body[update]))
    req.user.email = editedEmail
    req.user.password = req.body.newPassword
      ? req.body.newPassword
      : req.user.password

    await req.user.save()

    if (req.body.newPassword) {
      if (!(await bcrypt.compare(req.body.newPassword, lastPassword))) {
        const foundToken = req.user.tokens.find(
          (token) => token.token === req.token
        )
        req.user.tokens = [foundToken]
        await req.user.save()
      }
    }

    const userObj = req.user.toObject()
    delete userObj.tokens
    delete userObj.profilePic
    delete userObj.createdAt
    delete userObj.updatedAt
    delete userObj.__v
    delete userObj.password
    res.send(userObj)
  } else if (req.user.profilePicLink) {
    const allowedUpdates = ["name"]
    let invalidUpdates = []

    updates.forEach((update) => {
      if (!allowedUpdates.includes(update)) {
        invalidUpdates.push(update)
      }
    })

    //valid updates
    const validUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    )

    if (!validUpdates) {
      res.status(400)
      throw new Error(`Unable to update ${invalidUpdates.join(" ,")}`)
    }
    if (req.body.email && req.user.email !== req.body.email) {
      req.user.status = "pending"
    }
    //Valid updates
    updates.forEach((update) => (req.user[update] = req.body[update]))
    req.user.email = editedEmail

    await req.user.save()
    res.send(req.user)
  } else {
    res.status(401)
    throw new Error("Incorrect Password")
  }
})

// Post Upload avatar - /api/users/me/profilePic
const uploadProfilePic = asyncHandler(async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer()

  req.user.availablePic = true
  if (req.user.profilePicLink) {
    req.user.profilePicLink = "cleared"
  }
  req.user.profilePic = buffer
  await req.user.save()
  res.send()
})
// DELETE Delete avatar - /api/users/me/profilePic
const deleteProfilePic = asyncHandler(async (req, res) => {
  req.user.profilePic = null
  req.user.availablePic = false
  if (req.user.profilePicLink) {
    req.user.profilePicLink = "cleared"
  }
  await req.user.save()
  res.send()
})

// GET get avatar - /api/users/profilePic/:id
const serveProfilePic = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user || !user.profilePic) {
    fs.readFile("./backend/images/defaultAvatar.png", (err, data) => {
      res.set("Content-Type", "image/png")
      res.send(data)
    })
    return
  }
  res.set("Content-Type", "image/png")

  res.send(user.profilePic)
})

// POST Logout user - /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token !== req.token
  })
  await req.user.save()
  res.send()
})

//Logging out all users
const logoutAllUsers = asyncHandler(async (req, res) => {
  req.user.tokens = []
  await req.user.save()
  res.send()
})
//Logging out all users
const checkToken = asyncHandler(async (req, res) => {
  res.status(200).send({ message: "The Token is stil Valid" })
})

//Get Security Code
const getSecurityCode = asyncHandler(async (req, res) => {
  const { code } = req.body
  if (code) {
    throw new Error("Code is required")
  }
  const passedCode = Number(code)
  const securityCode = await SecretCode.findOne({ email: req.user.email })

  if (securityCode.code) {
    const code = securityCode.code

    if (passedCode === code) {
      await SecretCode.deleteOne({ email: req.user.email })
      req.user.status = "Verified"
      await req.user.save()
      res.status(200).send({ Status: "Verified" })
    } else {
      res.status(404)
      throw new Error("Invalid Code")
    }
  } else {
    res.status(404)
    throw new Error("Invalid Code")
  }
})

const getNewSecurityCode = asyncHandler(async (req, res) => {
  if (req.user.status === "pending") {
    let randomCode = Math.floor(1000 + Math.random() * 9000)

    const secretCode = await SecretCode.findOne({ email: req.user.email })
    if (secretCode) {
      await SecretCode.deleteOne({ email: req.user.email })
    }
    const secretC = new SecretCode({
      email: req.user.email,
      code: randomCode,
      dateCreated: Date.now(),
    })

    await secretC.save()
    sendVerificationEmail(req.user.email, req.user.name)
    res.status(201).send({ message: "Code Succesfully Sent!" })
  } else {
    res.status(400)
    throw new Error("Email already Verified")
  }
})

const getResetLink = asyncHandler(async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400)
    throw new Error("Email is required to reset Password")
  }
  if (validator.isEmail(email)) {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404)
      throw new Error("No user with this email")
    } else if (user.profilePicLink || user.profilePicLink === "cleared") {
      res.status(404)
      throw new Error("Google Accounts can't forgot their Password")
    }
    await sendResetPasswordEmail(email)
    user.validResetPassword = true
    await user.save()
    res.send({ message: `Reset Password Link sent to ${user.email}` })
  } else {
    res.status(400)
    throw new Error("Not a valid Email")
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body
  const passedToken = req.headers.authorization
  const token = passedToken ? passedToken.split(" ")[1] : null

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findOne({
        email: decoded.email,
      })

      if (user) {
        if (!password) {
          res.status(404)
          throw new Error("Password is required to reset it")
        }
        if (!user.validResetPassword) {
          res.status(400)
          throw new Error("Link Expired")
        }
        user.tokens = []
        user.password = password
        user.validResetPassword = false
        await user.save()
        res.send(user)
      } else {
        res.status(401)
        throw new Error("Unauthorized, Invalid Token")
      }
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error(err.message)
    }
  } else {
    throw new Error("Unauthorized, No Token")
  }
})

export {
  getUser,
  getProfile,
  registerUser,
  uploadProfilePic,
  deleteProfilePic,
  serveProfilePic,
  logoutUser,
  logoutAllUsers,
  checkToken,
  getSecurityCode,
  getNewSecurityCode,
  updateProfile,
  continueWithGoogle,
  getResetLink,
  resetPassword,
  getAllUsers,
  searchUsers,
  getUserById,
  deleteUser,
  canReviewUser,
  canOrderUser,
}
