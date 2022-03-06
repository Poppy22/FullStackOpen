const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title == undefined && request.body.url == undefined) {
    response.status(400).send()
    return
  }

  let blog = undefined
  if (request.body.likes == undefined) {
    blog = new Blog({ ...request.body, likes: 0 })
  } else {
    blog = new Blog(request.body)
  }
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await Blog.deleteOne({ _id: id })
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
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
