const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blogs = require('../models/blogs')
const Users = require('../models/user')
const helpers = require('../utils/helpers_blog.js')

beforeEach(async () => {
  await Users.deleteMany({})
  await Blogs.deleteMany({})

  const user = await new Users({
    ...helpers.newUser,
    passwordHash: await bcrypt.hash(helpers.newUser.password, 10),
  }).save()

  let blogObj = new Blogs({ ...helpers.initialData[0], user: user._id })
  await blogObj.save()
  blogObj = new Blogs({ ...helpers.initialData[1], user: user._id })
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
    const { username, password } = helpers.newUser
    let loginResponse = await api.post('/api/login').send({ username, password }).expect(200)
    expect(loginResponse.body.token).toBeDefined()

    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
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
    const { username, password } = helpers.newUser
    let loginResponse = await api.post('/api/login').send({ username, password }).expect(200)
    expect(loginResponse.body.token).toBeDefined()

    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPostWithoutLikes })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test(
    'adding a new post without title and URL',
    async () => {
      const { username, password } = helpers.newUser
      let loginResponse = await api.post('/api/login').send({ username, password }).expect(200)
      expect(loginResponse.body.token).toBeDefined()

      await api
        .post('/api/blogs')
        .send({ ...helpers.newPostWithoutTitleAndUrl })
        .set({ Authorization: `Bearer ${loginResponse.body.token}` })
        .expect(400)
    },
    helpers.time,
  )
})

describe('DELETE /api/blogs/:id', () => {
  test('deleting a post', async () => {
    const { username, password } = helpers.newUser
    let loginResponse = await api.post('/api/login').send({ username, password }).expect(200)
    expect(loginResponse.body.token).toBeDefined()

    // first add the post
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let getAllResponse = await api.get('/api/blogs')
    expect(getAllResponse.body).toHaveLength(helpers.initialData.length + 1)

    const id = response.body.id
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(204)

    getAllResponse = await api.get('/api/blogs')
    expect(getAllResponse.body).toHaveLength(helpers.initialData.length)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('updating a post', async () => {
    const { username, password } = helpers.newUser
    let loginResponse = await api.post('/api/login').send({ username, password }).expect(200)
    expect(loginResponse.body.token).toBeDefined()

    // first add the post
    const response = await api
      .post('/api/blogs')
      .send({ ...helpers.newPost })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // invalid PUT
    const id = response.body.id
    let updatedBlogResponse = await api
      .put(`/api/blogs/${id}`)
      .send({ ...helpers.newPostWithoutTitleAndUrl })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(400)

    // valid PUT
    updatedBlogResponse = await api
      .put(`/api/blogs/${id}`)
      .send({ ...helpers.updatedPost })
      .set({ Authorization: `Bearer ${loginResponse.body.token}` })
      .expect(200)

    expect(updatedBlogResponse.body.likes).toEqual(helpers.updatedPost.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
