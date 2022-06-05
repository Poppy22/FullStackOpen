const router = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const Session = require('../models/session')

router.delete('/', tokenExtractor, async (request, response) => {
  try {
    await Session.destroy({
      where: {
        userId: request.decodedToken.id,
      },
    })
    return response.status(200).json({ message: 'Logged out' })
  } catch (error) {
    return response.status(401).json({ error: 'Logout failed' })
  }
})

module.exports = router
