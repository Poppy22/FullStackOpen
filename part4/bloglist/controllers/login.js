const bcrypt = require('bcrypt')
const Router = require('express').Router
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const router = Router()

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const { username, passwordHash } = user

  if (user == null) {
    response.status(401).json({ message: 'Invalid login credentials' })
    return
  }

  const passwordCorrect = await bcrypt.compare(body.password, passwordHash)
  if (passwordCorrect == false) {
    response.status(401).json({ message: 'Invalid login credentials' })
    return
  }

  const token = jwt.sign({ username, id: user._id }, config.SECRET)
  response.status(200).send({ token })
})

module.exports = router
