const { Op } = require('sequelize')
const router = require('express').Router()
const checkSession = require('../middlewares/checkSession')
const tokenExtractor = require('../middlewares/tokenExtractor')
const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search,
          },
        },
        {
          author: {
            [Op.substring]: req.query.search,
          },
        },
      ],
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, checkSession, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, checkSession, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findOne({ where: { id: req.params.id } })

  if (blog.userId !== user.id) {
    return res.status(400).json({ error: 'Only blogpost author can delete it.' })
  }

  const deletedBlog = await Blog.destroy({ where: { id: req.params.id } })
  if (deletedBlog) {
    res.json(deletedBlog)
  } else {
    res.status(404).end()
  }
})

module.exports = router
