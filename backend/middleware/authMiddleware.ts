import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const protect = asyncHandler(async (req: any, res, next) => {
  const passedToken: any = req.headers.authorization
  const token: any = passedToken ? passedToken.split(' ')[1] : null

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

      const user: any = await User.findOne({
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

const admin = asyncHandler(async (req: any, res, next) => {
  if (req.user.rank == 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not an Admin!')
  }
})

export { protect, admin }
