const cache = app.use((req, res, next) => {
  res.set("Cache-control", "public, max-age=300")
  next()
})
export default cache
