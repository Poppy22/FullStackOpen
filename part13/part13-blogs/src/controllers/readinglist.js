const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { User } = require('../models')

const ReadingList = require('../models/readinglist')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      res.status(401).json({ error: 'token invalid' })
    }
  } else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.post('/', async (request, response) => {
  const { userId, blogId } = request.body

  try {
    const readingList = await ReadingList.create({
      userId,
      blogId,
    })
    response.json(readingList)
  } catch (error) {
    response.json(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const { id } = req.params
  const { read } = req.body

  try {
    const readingList = await ReadingList.findOne({
      where: {
        id,
      },
    })

    if (!readingList) {
      return res.status(400).json({ error: 'Reading list not found' })
    }

    if (request.decodedToken.id == readingList.toJSON().userId) {
      const updatedReadingList = await ReadingList.update(
        { read },
        {
          where: {
            id,
          },
        },
      )
      res.readingList(updatedReadingList)
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router
