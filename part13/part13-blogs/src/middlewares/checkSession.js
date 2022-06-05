const { Op } = require('sequelize')
const Session = require('../models/session')

const checkSession = async (req, res, next) => {
  const session = await Session.findOne({
    where: {
      userId: req.decodedToken.id,
      expires: {
        [Op.gt]: new Date(),
      },
    },
  })

  if (session) {
    next()
  } else {
    res.status(401).json({ error: 'Session has expired' })
  }
}

module.exports = checkSession
