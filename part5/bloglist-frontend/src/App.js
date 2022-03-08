import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [notification, setNotification] = useState()

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

  const notify = (message, type = 'success', timeout = 5) => {
    if (notification && notification.timeoutId !== undefined) {
      clearTimeout(notification.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      setNotification(null)
    }, timeout * 1000)
    setNotification({ message, type, timeoutId })
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
          <NewBlog blogs={blogs} setBlogs={setBlogs} notify={notify} />
        </div>
      ) : (
        <Login setToken={setToken} setUsername={setUsername} notify={notify} />
      )}

      <br />
      <h4>Current blogposts</h4>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
