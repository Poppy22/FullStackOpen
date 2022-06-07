import { useState } from 'react'

const NewBlog = ({ addPost, notify }) => {
  const [title, setTitleField] = useState('')
  const [author, setAuthorField] = useState('')
  const [url, setURLField] = useState('')

  const addPostHandler = async (event) => {
    event.preventDefault()

    const newPost = await addPost({ title, author, url })

    // Change local state
    setTitleField('')
    setAuthorField('')
    setURLField('')

    notify(`New blogpost ${newPost.title} by ${newPost.author} added`, 'success')
  }

  return (
    <div>
      <h4>Create new blogpost</h4>
      <form onSubmit={addPostHandler}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={({ target }) => setTitleField(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={({ target }) => setAuthorField(target.value)}
          />
        </div>
        <div>
          URL:
          <input type="text" value={url} name="URL" id="url" onChange={({ target }) => setURLField(target.value)} />
        </div>
        <button type="submit" id="new-post-btn">
          Add post
        </button>
      </form>
    </div>
  )
}

export default NewBlog
