import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  const passedToken = req.headers.authorization
  const token = passedToken ? passedToken.split(' ')[1] : null

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await User.findOne({
        _id: decoded.id,
        'tokens.token': token,
      })
      if (user) {
        req.user = user
        req.token = token
        next()
      } else {
        console.log(user, decoded)
        res.status(401)
        throw new Error('Unauthorized, Invalid Token')
      }
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error(err.message)
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized, No Token')
  }
})

const admin = asyncHandler(async (req, res, next) => {
  if (req.user.rank == 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not an Admin!')
  }
})

export { protect, admin }
