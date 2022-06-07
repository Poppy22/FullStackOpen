import { useState } from 'react'
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'

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
          <Button class="btn btn-success" onClick={toggleVisibility}>
            Hide
          </Button>
        ) : (
          <Button class="btn btn-success" onClick={toggleVisibility}>
            View
          </Button>
        )}
      </div>

      {showDetails && (
        <>
          URL: {blog.url} <br />
          Number of likes: {blog.likes} <br />
          Author username: {blog.user.username} <br />
          {token ? (
            <Button class="btn btn-success" onClick={likePost(blog)} id="like-btn">
              Like
            </Button>
          ) : (
            <></>
          )}
          <br />
          {postOwner ? (
            <Button class="btn btn-danger" onClick={deletePost} id="delete-btn">
              Delete
            </Button>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
