const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
require('express-async-errors')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const authRouter = require('./controllers/login')

const mongoUrl = config.MONGO_URL
mongoose.connect(mongoUrl)
const app = express()

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', authRouter)

app.use(middleware.errorHandler)

module.exports = app
