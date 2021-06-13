import asyncHandler from 'express-async-handler'
import Coupon from '../models/couponModel'
import Order from '../models/orderModel'

const generateCouponCode = asyncHandler(async (req: any, res) => {
  const { code, limited, amount, isPercent } = req.body

  function coupongenerator() {
    let coupon = ''
    let possible =
      'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789'
    for (let i = 0; i < 4; i++) {
      coupon += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return coupon
  }
  if (amount > 100 && isPercent === true) {
    throw new Error("Coupon Codes can't be above 100%")
  }
  const passedObj = async () => {
    const obj: any = {}
    if (code) {
      const existCode = await Coupon.findOne({ code })
      if (!existCode) {
        obj.code = code
      } else {
        throw new Error('Code already Exists')
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

    if (isPercent !== undefined) {
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
})

const getAllCoupons = asyncHandler(async (req: any, res) => {
  const coupons = await Coupon.find({})
    .sort({ createdAt: -1 })
    .limit(parseInt(req.query.limit ? req.query.limit : 0))
    .skip(parseInt(req.query.skip ? req.query.skip : 0))

  const count = await Coupon.countDocuments({})

  res.send({ coupons, count })
})

const validateCouponCode = asyncHandler(async (req: any, res) => {
  const { code } = req.body
  if (!code) {
    throw new Error("Code isn't Provided")
  }
  const validCode: any = await Coupon.findOne({ code })

  if (!validCode) {
    throw new Error('Invalid Code')
  } else {
    const usedBefore = await Order.findOne({
      'couponDiscount.info.code': code,
      'couponDiscount.info.codeId': validCode._id,
    })
    if (usedBefore) throw new Error('Code Used Before')
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

const deleteCouponCode = asyncHandler(async (req: any, res) => {
  const code = req.params.code
  const deleteAll = req.query.deleteAll
  if (!code && !deleteAll) {
    throw new Error('Code is required to delete it')
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

export {
  generateCouponCode,
  validateCouponCode,
  deleteCouponCode,
  getAllCoupons,
}
