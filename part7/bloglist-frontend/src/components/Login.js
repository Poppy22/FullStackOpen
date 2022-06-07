import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({ setToken, setUsername, notify }) => {
  const [username, setUsernameField] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('token', user.token)
      window.localStorage.setItem('username', username)
      // Change local state
      setUsernameField('')
      setPassword('')
      // Change global state
      setUsername(username)
      setToken(user.token)
    } catch (exception) {
      notify('Wrong username or password', 'error')
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsernameField(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          LOGIN
        </button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default Login
