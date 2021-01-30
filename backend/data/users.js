import bcrypt from "bcryptjs"

const users = [
  {
    name: "Yassin",
    email: "yassineldeeb94@gmail.com",
    password: bcrypt.hashSync("Yassin2019", 8),
    rank: "admin",
  },
  {
    name: "Amin",
    email: "aminEldeeb@gmail.com",
    password: bcrypt.hashSync("Yassin2019", 8),
  },
  {
    name: "Menna",
    email: "mennaEldeeb@gmail.com",
    password: bcrypt.hashSync("Yassin2019", 8),
    rank: "delivery",
  },
]

export default users
