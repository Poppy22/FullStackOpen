const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (username == undefined || password == undefined) {
    response.status(400).json({ error: 'Missing username or password' })
    return
  }

  if (password.length < 3) {
    response.status(400).json({ error: 'Password must be at least 3 characters long' })
    return
  }

  const existingUser = await User.findOne({ username })
  if (existingUser != undefined) {
    response.status(400).json({ error: 'Username already taken' })
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
