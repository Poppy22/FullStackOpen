const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, password: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.protectPath, async (request, response) => {
  if (request.body.title == undefined && request.body.url == undefined) {
    response.status(400).send()
    return
  }

  const user = await User.findById(request.user)

  let blog = undefined
  if (request.body.likes == undefined) {
    blog = new Blog({ ...request.body, likes: 0, user: user._id })
  } else {
    blog = new Blog({ ...request.body, user: user._id })
  }
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.protectPath, async (request, response) => {
  const { id } = request.params

  await Blog.deleteOne({ _id: id })
  response.status(204).end()
})

blogsRouter.put('/:id', middleware.protectPath, async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  if (title == null && url == null) {
    response.status(400).send()
    return
  }

  if (likes == undefined) {
    likes = 0
  }

  const newPost = await Blog.findByIdAndUpdate(
    { _id: id },
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' },
  )

  response.status(200).json(newPost)
})

module.exports = blogsRouter
