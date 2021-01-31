import express from "express"
import multer from "multer"
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
} from "../controllers/usersController.js"
import protect from "../middleware/authMiddleware.js"

const userRouter = express.Router()
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Please provide an image"))
    }
    cb(undefined, true)
  },
})

userRouter.post("/", registerUser)
userRouter.post("/login", getUser)
userRouter.post("/googleOauth", continueWithGoogle)
userRouter.get("/profile", protect, getProfile)
userRouter.patch("/profile", protect, updateProfile)

userRouter.post(
  "/me/profilePic",
  protect,
  upload.single("profilePic"),
  uploadProfilePic
)
userRouter.get("/profilePic/:id", serveProfilePic)
userRouter.delete("/me/profilePic", protect, deleteProfilePic)

userRouter.post("/logout", protect, logoutUser)

userRouter.post("/logoutAll", protect, logoutAllUsers)

userRouter.post("/checkToken", protect, checkToken)

userRouter.post("/getSecurityCode", protect, getSecurityCode)

userRouter.get("/getNewSecurityCode", protect, getNewSecurityCode)

export default userRouter
