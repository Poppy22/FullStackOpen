const time = 10000

const initialData = [
  {
    author: 'Vann',
    title: 'Cum sa fii smecher',
    url: 'alabalaportocala.com',
    likes: 13,
  },
  {
    author: 'Carmen',
    title: 'Cum sa mergi la phd',
    url: 'alabalaportocala.com',
    likes: 23,
  },
]

const newPost = {
  author: 'abc',
  title: 'New post',
  url: 'alabalaportocala.com',
  likes: 13,
}

const updatedPost = {
  author: 'abc',
  title: 'New post',
  url: 'alabalaportocala.com',
  likes: 15,
}

const newPostWithoutLikes = {
  author: 'abc',
  title: 'New post without likes',
  url: 'alabalaportocala.com',
}

const newPostWithoutTitleAndUrl = {
  author: 'Just Author',
  likes: 1000,
}

const newUser = {
  username: 'adela',
  password: 'Cum sa fii faer',
  name: 'Adela',
}

module.exports = {
  initialData,
  newPost,
  newPostWithoutLikes,
  time,
  newPostWithoutTitleAndUrl,
  updatedPost,
  newUser,
}
