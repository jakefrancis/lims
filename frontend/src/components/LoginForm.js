import React, { useState } from 'react'


const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    login({ username,password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
      username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={usernameHandler}
        />
      </div>
      <div>
      password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={passwordHandler}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}


export default LoginForm