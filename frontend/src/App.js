import './App.css';
import React from 'react'
import {useState,useEffect} from 'react'
import LoginForm from './components/LoginForm';
import loginService from './services/login'
import reagentService from './services/reagent'



function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      reagentService.setToken(user.token)
    }
  },[])

  const handleLogin = async (credentials) => {
    try{
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      reagentService.setToken(user.token)
      setUser(user)
      console.log('success')
    }
    catch(error){
      console.log(error)
    }
  }




  return (
    <div className="App">
      {user === null ? <LoginForm login={handleLogin}/> : <h1>Hello {user.name}</h1>}
    </div>
  );
}

export default App;
