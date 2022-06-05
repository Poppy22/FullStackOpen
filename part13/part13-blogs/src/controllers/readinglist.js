const router = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const checkSession = require('../middlewares/checkSession')
const ReadingList = require('../models/readinglist')

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

router.put('/:id', tokenExtractor, checkSession, async (req, res) => {
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
