import dotenv from 'dotenv'
dotenv.config()

const notFoundRouter = (req: any, res: any, next: any) => {
  const err = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(err)
}
const errRouter = (err: any, req: any, res: any, next: any) => {
  console.log(err.message)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.send({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  })
  next()
}
export { errRouter, notFoundRouter }
