import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlog from './NewBlog'

const blog = {
  title: 'Blogpost title!',
  author: 'Blogpost author!',
  url: 'Blogpost url!',
  likes: 5,
  user: {
    username: 'Ceva-cu-halva',
  },
}

const newBlog = {
  title: 'New blogpost title!',
  author: 'New blogpost author!',
  url: 'New blogpost url!',
  likes: 0,
  user: {
    username: 'Ceva-cu-halva',
  },
}

test('renders title and author by default', () => {
  const component = render(<Blog blog={blog} />).container

  expect(component).toHaveTextContent(blog.title)
  expect(component).toHaveTextContent(blog.author)
})

test('does not render url and likes by default', () => {
  const component = render(<Blog blog={blog} />).container

  expect(component).not.toHaveTextContent(`Likes: ${blog.likes}`)
  expect(component).not.toHaveTextContent(`URL: ${blog.url}`)
})

test('show details for blog when clicking on `view`', () => {
  const component = render(<Blog blog={blog} />).container

  const button = screen.getByText('View')
  userEvent.click(button)

  expect(component).toHaveTextContent(`Number of likes: ${blog.likes}`)
  expect(component).toHaveTextContent(`URL: ${blog.url}`)

  const hide_button = screen.getByText('Hide')
  expect(hide_button).toBeDefined()
})

test('clicking the like button twice', () => {
  const mockHandler = jest.fn()

  // give the token to mimic being logged in
  render(<Blog blog={blog} token="abc" likePost={() => mockHandler} />)
  const button = screen.getByText('View')
  userEvent.click(button)

  // press like button twice
  const like_button = screen.getByText('Like')
  userEvent.click(like_button)
  userEvent.click(like_button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('creating a blogpost', () => {
  const addPost = jest.fn(() => ({ ...newBlog }))

  const content = render(<NewBlog addPost={addPost} notify={() => null} />).container

  const input_title = content.querySelector('#title')
  userEvent.type(input_title, newBlog.title)

  const input_author = content.querySelector('#author')
  userEvent.type(input_author, newBlog.author)

  const input_url = content.querySelector('#url')
  userEvent.type(input_url, newBlog.url)

  const sendButton = screen.getByText('Add post')
  act(() => {
    userEvent.click(sendButton)
  })

  expect(addPost.mock.calls).toHaveLength(1)
  expect(addPost.mock.calls[0][0].title).toBe(newBlog.title)
  expect(addPost.mock.calls[0][0].author).toBe(newBlog.author)
  expect(addPost.mock.calls[0][0].url).toBe(newBlog.url)
})
