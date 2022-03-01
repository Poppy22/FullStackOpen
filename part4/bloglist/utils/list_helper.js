const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => (max.likes < blog.likes ? blog : max), blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const pairs = Array.from(
    blogs.reduce((m, { author }) => m.set(author, m.has(author) ? m.get(author) + 1 : 1), new Map()).entries(),
  )

  const pair = pairs.reduce((max, p) => (max[1] < p[1] ? p : max), pairs[0])
  return { author: pair[0], blogs: pair[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const pairs = Array.from(
    blogs
      .reduce((m, { author, likes }) => m.set(author, m.has(author) ? m.get(author) + likes : likes), new Map())
      .entries(),
  )

  const pair = pairs.reduce((max, p) => (max[1] < p[1] ? p : max), pairs[0])
  return { author: pair[0], likes: pair[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
