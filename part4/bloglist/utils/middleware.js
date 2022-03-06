const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')
const config = require('./config')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    return response.status(400).json({ error: error.message })
  }
}

const tokenExtractor = (request, response, next) => {
  if (request.get('authorization')) {
    const token = request.get('authorization').split(' ')[1]
    request.token = token
  }

  next()
}

const protectPath = async (request, response, next) => {
  const token = request.token
  if (!token) {
    response.status(401).json({ message: 'Invalid token 1' })
    return
  }

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    response.status(401).json({ message: 'Invalid token 2' })
    return
  }

  const user = await User.findById(decodedToken.id)
  request.user = user

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  protectPath,
  tokenExtractor,
}
