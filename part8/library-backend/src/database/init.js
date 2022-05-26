import mongoose from 'mongoose'

console.log(`Connecting to MongoDB`)

mongoose
  .connect(process.env.MONGO_URL)
  .then((_result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`)
  })
