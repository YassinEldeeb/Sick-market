import express from 'express'
import multer from 'multer'
import {
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
  updateUserRank,
  serveTinyProfilePic,
} from '../controllers/usersController'
import { protect, admin } from '../middleware/authMiddleware'

const userRouter = express.Router()
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Please provide an image'))
    }
    cb(null, true)
  },
})

userRouter.post('/', registerUser)
userRouter.get('/', protect, admin, getAllUsers)
userRouter.post('/search', protect, admin, searchUsers)
userRouter.post('/login', getUser)
userRouter.post('/googleOauth', continueWithGoogle)
userRouter.get('/profile', protect, getProfile)
userRouter.patch('/profile', protect, updateProfile)

userRouter.post(
  '/me/profilePic',
  protect,
  upload.single('profilePic'),
  uploadProfilePic
)
userRouter.get('/profilePic/:id', serveProfilePic)
userRouter.get('/profilePic/tiny/:id', serveTinyProfilePic)
userRouter.delete('/me/profilePic', protect, deleteProfilePic)

userRouter.post('/logout', protect, logoutUser)

userRouter.post('/logoutAll', protect, logoutAllUsers)

userRouter.post('/checkToken', protect, checkToken)

userRouter.post('/getSecurityCode', protect, getSecurityCode)

userRouter.get('/getNewSecurityCode', protect, getNewSecurityCode)

userRouter.post('/resetPasswordEmail', getResetLink)

userRouter.post('/resetPassword', resetPassword)

userRouter.get('/:id', protect, admin, getUserById)
userRouter.delete('/:id', protect, admin, deleteUser)
userRouter.post('/canReview/:id', protect, admin, canReviewUser)
userRouter.post('/canOrder/:id', protect, admin, canOrderUser)
userRouter.post('/:id/rank', protect, admin, updateUserRank)

export default userRouter
