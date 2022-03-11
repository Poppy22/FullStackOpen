import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs, notify, addBlogpostFormRef }) => {
  const [title, setTitleField] = useState('')
  const [author, setAuthorField] = useState('')
  const [url, setURLField] = useState('')

  const addPost = async (event) => {
    event.preventDefault()

    addBlogpostFormRef.current.toggleVisibility()
    const token = window.localStorage.getItem('token')
    const newPost = await blogService.create({ token, title, author, url })

    setBlogs([...blogs, newPost])

    // Change local state
    setTitleField('')
    setAuthorField('')
    setURLField('')

    notify(`New blogpost ${newPost.title} by ${newPost.author} added`, 'success')
  }

  return (
    <div>
      <h4>Create new blogpost</h4>
      <form onSubmit={addPost}>
        <div>
          title:
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitleField(target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthorField(target.value)} />
        </div>
        <div>
          URL:
          <input type="text" value={url} name="URL" onChange={({ target }) => setURLField(target.value)} />
        </div>
        <button type="submit">Add post</button>
      </form>
    </div>
  )
}

export default NewBlog
