import asyncHandler from "express-async-handler"
import Coupon from "../models/couponModel.js"

const generateCouponCode = asyncHandler(async (req, res) => {
  const { code, limited, isPercent, amount, expireDate } = req.body

  function coupongenerator() {
    var coupon = ""
    var possible =
      "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789"
    for (var i = 0; i < 4; i++) {
      coupon += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return coupon
  }
  if (
    (isPercent === undefined && amount > 100) ||
    (isPercent === true && amount > 100)
  ) {
    throw new Error("Coupon Codes can't be above 100%")
  }
  if (req.user.rank !== "admin") {
    throw new Error("Admins are the only ones who can generate Coupon Codes")
  } else {
    const passedObj = async () => {
      const obj = {}
      if (code) {
        const existCode = await Coupon.findOne({ code })
        if (!existCode) {
          obj.code = code
        } else {
          throw new Error("Code already Exists")
        }
      } else {
        let existCode
        let genCode
        genCode = coupongenerator()
        existCode = await Coupon.findOne({ code: genCode })
        while (existCode) {
          genCode = coupongenerator()
          existCode = await Coupon.findOne({ code: genCode })
        }
        obj.code = genCode
      }
      if (limited) {
        obj.limited = limited
      }
      if (expireDate) {
        obj.expireDate = expireDate
      }
      if (isPercent) {
        obj.isPercent = isPercent
      }
      if (amount) {
        obj.amount = amount
      }
      return obj
    }

    const couponCode = new Coupon(await passedObj())

    await couponCode.save()
    res.send({ code: couponCode })
  }
})

const validateCouponCode = asyncHandler(async (req, res) => {
  const { code } = req.body
  if (!code) {
    throw new Error("Code isn't Provided")
  }
  const validCode = await Coupon.findOne({ code })
  if (!validCode) {
    throw new Error("Invalid Code")
  }

  if (validCode.numOfUsedTimes >= validCode.limited) {
    await validCode.remove()
  }
  if (
    validCode.limited ? validCode.numOfUsedTimes <= validCode.limited : true
  ) {
    res.send({ code: validCode })
  }
})

const deleteCouponCode = asyncHandler(async (req, res) => {
  const { code, deleteAll } = req.body
  if (!code && !deleteAll) {
    throw new Error("Code is required to delete it")
  }
  if (req.user.rank !== "admin") {
    throw new Error("Admins are the only ones who can delete Coupon Codes")
  }
  if (deleteAll) {
    await Coupon.deleteMany({})
    res.send({ message: "all Coupon Codes've been deleted" })
  } else {
    const existCode = await Coupon.findOne({ code })
    if (!existCode) {
      throw new Error("Code doesn't exist")
    }
    await existCode.remove()
    res.send(existCode)
  }
})

export { generateCouponCode, validateCouponCode, deleteCouponCode }
