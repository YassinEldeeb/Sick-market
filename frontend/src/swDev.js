import dotenv from "dotenv"
dotenv.config()

export default function swDev() {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`
  console.log(swUrl)
  navigator.serviceWorker.register(swUrl).then((res) => {
    console.warn("Response", res)
  })
}
