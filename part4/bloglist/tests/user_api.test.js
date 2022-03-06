const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Users = require('../models/user')
const helpers = require('../utils/helpers_user.js')

const api = supertest(app)

beforeEach(async () => {
  await Users.deleteMany({})
})

describe('POST /api/users', () => {
  test('adding a new user', async () => {
    const response = await api
      .post('/api/users')
      .send({ ...helpers.newUser })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // test new number of blosposts
    const numberOfBlogs = await Users.countDocuments({})
    expect(numberOfBlogs).toEqual(1)

    // test content of the new blogpost
    expect(response.body.username).toEqual(helpers.newUser.username)
    expect(response.body.name).toEqual(helpers.newUser.name)
  })

  test('adding invalid user', async () => {
    await api
      .post('/api/users')
      .send({ ...helpers.newUser })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let response = await api
      .post('/api/users')
      .send({ ...helpers.newUserNameTaken })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('Username already taken')

    response = await api
      .post('/api/users')
      .send({ ...helpers.newUserShortPassword })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('Password must be at least 3 characters long')

    response = await api
      .post('/api/users')
      .send({ ...helpers.newUserUsernameMissing })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toEqual('Missing username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
