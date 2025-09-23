require('dotenv').config()

const PORT = process.env.PORT || 4000
const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined')
  process.exit(1)
}

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined')
  process.exit(1)
}

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET
}
