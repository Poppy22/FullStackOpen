import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [notification, setNotification] = useState()
  const addBlogpostFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const tokenStorage = window.localStorage.getItem('token')
    const usernameStorage = window.localStorage.getItem('username')
    if (tokenStorage && usernameStorage) {
      setToken(tokenStorage)
      setUsername(usernameStorage)
    }
  }, [])

  const updatePostsAfterPut = (newPost) => {
    setBlogs(blogs.map((e) => (e.id === newPost.id ? newPost : e)))
  }

  const updatePostsAfterDelete = (id) => {
    setBlogs(blogs.filter((e) => e.id !== id))
  }

  const notify = (message, type = 'success', timeout = 5) => {
    if (notification && notification.timeoutId !== undefined) {
      clearTimeout(notification.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      setNotification(null)
    }, timeout * 1000)
    setNotification({ message, type, timeoutId })
  }

  const likePost = (blog) => async (event) => {
    event.preventDefault()
    const newPost = await blogService.put({ token, ...blog })
    updatePostsAfterPut(newPost)
    notify(`You have liked ${newPost.title} by ${newPost.author}`, 'success')
  }

  const addPost = async (data) => {
    addBlogpostFormRef.current.toggleVisibility()

    const newPost = await blogService.create({ token, ...data })
    setBlogs([...blogs, newPost])

    return newPost
  }

  return (
    <div>
      <h2>Blogs to read</h2>
      <Notification {...notification} />
      <br />
      {username && token ? (
        <div>
          Hello {username}! <Logout setToken={setToken} setUsername={setUsername} notify={notify} />
          <br />
          <Togglable buttonLabel="Add new note" cancelLabel="Cancel" ref={addBlogpostFormRef}>
            <NewBlog addPost={addPost} notify={notify} />
          </Togglable>
        </div>
      ) : (
        <Togglable buttonLabel="Login" cancelLabel="Cancel">
          <Login setToken={setToken} setUsername={setUsername} notify={notify} />
        </Togglable>
      )}

      <br />
      <h4>Current blogposts</h4>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likePost={likePost}
            updatePostsAfterDelete={updatePostsAfterDelete}
            token={token}
            postOwner={token && username === blog.user.username}
            notify={notify}
          />
        ))}
    </div>
  )
}

export default App
