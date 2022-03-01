const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGO_URL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use('', blogsRouter)

module.exports = app
