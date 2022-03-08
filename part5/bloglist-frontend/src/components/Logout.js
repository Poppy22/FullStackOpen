const Logout = ({ setToken, setUsername, notify }) => {
  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')

    // Change global state
    setUsername(null)
    setToken(null)

    notify('You have been logged out', 'success')
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        <button type="submit">LOGOUT</button>
      </form>
    </div>
  )
}

export default Logout
