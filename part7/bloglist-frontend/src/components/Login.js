import { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsernameField(target.value)}
          />

          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit" id="login-btn">
            LOGIN
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
}

export default Login
