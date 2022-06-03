const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create({ ...req.body, createdAt: new Date() })
    res.json(user)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: ['Validation isEmail on username failed'],
      })
    }
    return res.status(400).json({ error })
  }
})

router.put('/:name', async (req, res) => {
  try {
    console.log(req.params.name)
    console.log(req.body.name)
    const user = await User.findOne({ where: { name: req.params.name } })
    if (!user) {
      res.status(404).end()
    }

    user.name = req.body.name
    await user.save()
    res.json(user)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
