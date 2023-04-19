import { React } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Login from './Login'
import Product from './Product'
import Fav from './Fav'
import Cart from './Cart'

const RoutesContainer = ({ showNavbar }) => {
  const location = useLocation() 
  
  return (
    <>
      {showNavbar && location.pathname !== '/' && <Navbar />} 
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/home" Component={Home} />
        <Route path="/product" Component={Product} />
        <Route path="/fav" Component={Fav} />
        <Route path="/cart" Component={Cart} />
      </Routes> 
    </>
  )
}

export default RoutesContainer