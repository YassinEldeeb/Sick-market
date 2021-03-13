import asyncHandler from "express-async-handler"

const cache = asyncHandler(async (req, res, next) => {
  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=31536000`)
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`)
  }

  next()
})
export default cache
