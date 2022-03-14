const testRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

testRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testRouter
