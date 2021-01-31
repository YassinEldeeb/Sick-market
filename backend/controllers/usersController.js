import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import sharp from "sharp"
import fs from "fs"
import validator from "validator"
import sendWelcomeEmail from "../emails/account.js"
import SecretCode from "../models/secretCode.js"
import bcrypt from "bcryptjs"

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

  if (typeof name === "number") {
    throw new Error("Name must be alphabetical letters!")
  }
  if (!name || !email || !password) {
    console.log(name, email, password)
    throw new Error("name, Email and Password are Required")
  } else {
    if (!validator.isEmail(email)) {
      throw new Error("Email isn't an actual email")
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400)
      throw new Error("User already exists, Login below")
    }
    const user = new User({
      name,
      email,
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
  console.log(googleSignture)
  if (!existingUser) {
    const newUser = new User({
      name,
      email,
      password: googlePassword,
      profilePicLink,
      status: "Verified",
    })
    const token = newUser.generateToken()
    newUser.tokens.unshift({ token })
    await newUser.save()
    res.status(201).send({ user: newUser, token })
  } else {
    console.log("Logged In")
    if (googleSignture === process.env.GOOGLE_SIGNTURE) {
      const user = await User.findByCredentials(
        email,
        googlePassword,
        "googleSignin"
      )
      console.log("RAAAAN", user)
      if (user) {
        res.send(user)
      } else {
        res.status(401)
      }
    } else {
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
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "email", "password"]
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
  const lastPassword = req.user.password
  //Valid updates
  updates.forEach((update) => (req.user[update] = req.body[update]))
  await req.user.save()

  if (!(await bcrypt.compare(req.body.password, lastPassword))) {
    console.log("Different Password is Assigned")
    const foundToken = req.user.tokens.find(
      (token) => token.token === req.token
    )
    req.user.tokens = [foundToken]
    req.user.save()
  }

  const userObj = req.user.toObject()
  delete userObj.tokens
  delete userObj.profilePic
  delete userObj.createdAt
  delete userObj.updatedAt
  delete userObj.__v
  delete userObj.password
  res.send(userObj)
})

// Post Upload avatar - /api/users/me/profilePic
const uploadProfilePic = asyncHandler(async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer()

  req.user.profilePic = buffer
  await req.user.save()
  res.send()
})
// DELETE Delete avatar - /api/users/me/profilePic
const deleteProfilePic = asyncHandler(async (req, res) => {
  req.user.profilePic = undefined
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
  const passedCode = Number(req.body.code)
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
    console.log(secretCode)
    if (secretCode) {
      await SecretCode.deleteOne({ email: req.user.email })
      console.log("Deleted", secretCode, req.user.email)
    }
    const secretC = new SecretCode({
      email: req.user.email,
      code: randomCode,
      dateCreated: Date.now(),
    })

    await secretC.save()
    sendWelcomeEmail(req.user.email, req.user.name)
    res.status(201).send({ message: "Code Succesfully Sent!" })
  } else {
    res.status(400)
    throw new Error("Email already Verified")
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
}
