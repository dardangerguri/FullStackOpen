const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config.js')

mongoose.set('strictQuery', false)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

module.exports = mongoose
