import './App.css';
import React from 'react'
import {useState,useEffect} from 'react'
import LoginForm from './components/LoginForm';
import loginService from './services/login'
import reagentService from './services/reagent'
import CollapsibleTable from './components/CollapsibleTable';



function App() {
  const [user, setUser] = useState(null)
  const [standards, setStandards] = useState([])
  const [reagents, setReagents] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      reagentService.setToken(user.token)
    }
  },[])

  const getAllReagents = async () => {
    const reqReagents = await reagentService.getAll()
    setReagents(reqReagents)
  }

  useEffect(getAllReagents, [])

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
      {user === null ? <LoginForm login={handleLogin}/> : <CollapsibleTable reagents={reagents}/>}
    </div>
  );
}

export default App;
