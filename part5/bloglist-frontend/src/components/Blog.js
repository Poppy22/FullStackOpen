import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, likePost, updatePostsAfterDelete, token, postOwner, notify }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const deletePost = async (event) => {
    event.preventDefault()
    const result = window.confirm(`Are you sure you want to delete ${blog.title} by ${blog.author}?`)
    if (!result) return

    const id = blog.id
    await blogService.remove({ token, id })
    updatePostsAfterDelete(id)
    notify(`You have deleted ${blog.title} by ${blog.author}`, 'success')
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        {showDetails ? (
          <button onClick={toggleVisibility}>Hide</button>
        ) : (
          <button onClick={toggleVisibility}>View</button>
        )}
      </div>

      {showDetails && (
        <>
          URL: {blog.url} <br />
          Number of likes: {blog.likes} <br />
          Author username: {blog.user.username} <br />
          {token ? <button onClick={likePost(blog)}> Like </button> : <></>} <br />
          {postOwner ? <button onClick={deletePost}> Delete </button> : <></>}
        </>
      )}
    </div>
  )
}

export default Blog
