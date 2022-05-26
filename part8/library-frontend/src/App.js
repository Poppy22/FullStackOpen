import { useApolloClient } from '@apollo/client'
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import BookRecommendation from './components/BookRecommendation'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  const notify = (data, timeout = 3500) => {
    setNotification(data)
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  useEffect(() => {
    const parsedToken = JSON.parse(window.localStorage.getItem('user-token'))

    if (parsedToken) setToken(parsedToken.value)
  }, [])

  useEffect(() => {
    if (token && page === 'login') setPage('authors')
  }, [token]) // eslint-disable-line

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token ? (
          <button onClick={() => logout()}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <BookRecommendation show={page === 'recommendations'} token={token} />

      <Login show={page === 'login'} notify={notify} setToken={setToken} />
    </div>
  )
}

export default App
