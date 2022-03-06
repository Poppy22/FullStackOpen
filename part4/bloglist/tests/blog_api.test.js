const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const helpers = require('./helpers.js')

beforeEach(async () => {
  await Blogs.deleteMany({})
  let blogObj = new Blogs(helpers.initialData[0])
  await blogObj.save()
  blogObj = new Blogs(helpers.initialData[1])
  await blogObj.save()
})

const api = supertest(app)

describe('GET /api/blogs', () => {
  test('blogposts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is one blogpost', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helpers.initialData.length)
  })

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map((r) => r.title)
    expect(title).toContain('Cum sa fii smecher')
  })

  test('returned items contain id', async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('adding a new post', async () => {
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toMatchObject(helpers.newPost)

    // test new number of blosposts
    const numberOfBlogs = await Blogs.countDocuments({})
    expect(numberOfBlogs).toEqual(helpers.initialData.length + 1)

    // test content of the new blogpost
    expect(response.body.title).toEqual(helpers.newPost.title)
    expect(response.body.author).toEqual(helpers.newPost.author)
    expect(response.body.likes).toEqual(helpers.newPost.likes)
  })

  test('adding a new post without number of likes', async () => {
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPostWithoutLikes })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test(
    'adding a new post without title and URL',
    async () => {
      await api
        .post('/api/blogs')
        .send({ ...helpers.newPostWithoutTitleAndUrl })
        .expect(400)
    },
    helpers.time,
  )
})

describe('DELETE /api/blogs/:id', () => {
  test('deleting a post', async () => {
    // first add the post
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let getAllResponse = await api.get('/api/blogs')
    expect(getAllResponse.body).toHaveLength(helpers.initialData.length + 1)

    const id = response.body.id
    await api.delete(`/api/blogs/${id}`).expect(204)

    getAllResponse = await api.get('/api/blogs')
    expect(getAllResponse.body).toHaveLength(helpers.initialData.length)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updating a post', async () => {
    // first add the post
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // invalid PUT
    const id = response.body.id
    let updatedBlogResponse = await api
      .put(`/api/blogs/${id}`)
      .send({ ...helpers.newPostWithoutTitleAndUrl })
      .expect(400)

    // valid PUT
    updatedBlogResponse = await api
      .put(`/api/blogs/${id}`)
      .send({ ...helpers.updatedPost })
      .expect(200)

    expect(updatedBlogResponse.body.likes).toEqual(helpers.updatedPost.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
