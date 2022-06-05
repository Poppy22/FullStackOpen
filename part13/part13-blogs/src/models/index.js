const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: Readinglist, as: 'readings' })
User.belongsToMany(Blog, { through: Readinglist, as: 'readings' })

module.exports = {
  User,
  Blog,
  Readinglist,
}
