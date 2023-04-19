import { React, useReducer } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Product from './components/Product'
import Fav from './components/Fav'
import Cart from './components/Cart'
import { stateContext } from './components/Context'
import { initialState, stateReducer } from './components/Reducer'
import './assets/css/main.css'

const App = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  
  
  return (
    <>
      <stateContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
        {state?.isLoggedIn ? (
          <>
          <Navbar />
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/product" element={<Product/>} />
            <Route path="/fav" element={<Fav/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="*" element={<Navigate to={'/home'}></Navigate>} />
          </Routes> 
          </>
          )
          : 
          (
            <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="*" element={<Navigate to={'/'}></Navigate>} />
          </Routes> 

          ) }
          
        </BrowserRouter>
      </stateContext.Provider>
    </>
  )
}

export default App