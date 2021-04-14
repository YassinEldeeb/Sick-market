import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import textSearch from 'mongoose-partial-full-search'
dotenv.config()

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      searchable: true,
    },
    profilePic: {
      type: Buffer,
    },
    profilePicPreview: {
      type: Buffer,
    },
    availablePic: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicLink: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      searchable: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error(
            "Password can't contain any sort of 'password' keyword"
          )
        }
      },
    },
    rank: {
      type: String,
      required: true,
      default: 'user',
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    validResetPassword: {
      type: Boolean,
      default: false,
    },
    canReview: {
      type: Boolean,
      default: true,
    },
    canOrder: {
      type: Boolean,
      default: true,
    },
    totalPaidOrders: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()

  delete user.password
  delete user.profilePic
  delete user.createdAt
  delete user.updatedAt
  delete user.__v
  delete user.tokens
  return user
}

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30 days',
  })
  return token
}

userSchema.statics.findByCredentials = async function (email, password, type) {
  if (validator.isEmail(email)) {
    const user = await User.findOne({ email })

    if (!user) {
      throw new Error('Incorrect Email or Password')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = user.generateToken()
      user.tokens.unshift({ token })
      await user.save()
      return { user, token: user.tokens[0].token }
    } else {
      if (password !== user.password && user.profilePicLink) {
        throw new Error('Try Logging in with Google')
      } else if (password !== user.password && !user.profilePicLink) {
        if (type) {
          throw new Error('Email already Exists, Login below')
        } else {
          throw new Error('Incorrect Email or Password')
        }
      }
    }
  } else {
    throw new Error("Email isn't an actual email")
  }
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.plugin(textSearch)
userSchema.index({ name: 'text' })
userSchema.index({ email: 'text' })

const User = mongoose.model('User', userSchema)

export default User
