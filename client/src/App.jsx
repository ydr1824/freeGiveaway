import { createContext, useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import { SignUp } from './SignUp'
import { Login } from './Login'
import { MainPage } from './MainPage'


export const AuthContext = createContext(null)


function App() {
  const [currentuser, setCurrentUser] = useState()
  function setUser(user){
    setCurrentUser(user)
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage setCurrentUser={setCurrentUser}/>
    },
    {
      path : '/sign-up',
      element: <SignUp setCurrentUser={setCurrentUser}/>
    },
    {
      path : '/login',
      element: <Login setCurrentUser={setCurrentUser}/>
    }
  ])

  return (
    <>
    <AuthContext.Provider value={currentuser}>
      <RouterProvider router={router}/>
    </AuthContext.Provider>
      
    </>
  )
}

export default App
