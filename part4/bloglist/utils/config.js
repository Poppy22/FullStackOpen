require('dotenv').config()

let PORT = process.env.PORT || 3003
let MONGO_URL = process.env.MONGO_URL

module.exports = {
  MONGO_URL,
  PORT,
}
