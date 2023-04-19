import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

function Fav() {
  const [favorites, setFavorites] = useState([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const addToCart = (product) => {
    setIsAddingToCart(true) // set the state to trigger the animation
    setTimeout(() => {
      setIsAddingToCart(false) // reset the state after the animation finishes
    }, 1000)
    if (product.quantity <= 0) {
      return
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [] // get existing items or initialize an empty array
    cartItems.push(product) // add the product to the array
    localStorage.setItem('cartItems', JSON.stringify(cartItems)) // save the array to local storage
  }

  return (
    <>
      <div className='px-6'>
        <h1>Favorites:</h1>
        <div className='container mx-auto flex flex-col justify-center items-center md:flex-row'>
          {favorites.map((product, i) => (
            <div
              key={product.id}
              className='md:w-1/3 flex flex-col bg-emerald-400 m-2 space-y-2 shadow-lg rounded-lg'
            >
              <img
                style={{ height: '350px', width: '420px' }}
                className=''
                src={product.image}
                alt={product.id}
              />
              <div id='icon' className='relative'>
                <FavoriteIcon
                  className='text-white absolute top-1 left cursor-pointer'
                  style={{
                    color: 'red',
                  }}
                  onClick={() => removeFromFavorites(product.id)}
                />
              </div>
              <div className='space-y-4 px-3'>
                <h2 className='text-white text-md font-bold'>{product.name}</h2>
                <p className='text-white text-md font-bold'>
                  {product.Description}
                </p>
                <p className='text-white text-md font-bold'>
                  Price: {product.price}
                </p>
              </div>
              <div className='flex items-center relative px-3 py-4'>
                <input
                  className='text-center w-20 rounded-full mr-2'
                  type='number'
                  name='count'
                  value={product.quantity > 0 ? product.quantity : 0}
                  min='1'
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10)
                    if (newValue >= 0) {
                      setProducts((prevProducts) =>
                        prevProducts.map((p) =>
                          p.id === product.id ? { ...p, quantity: newValue } : p
                        )
                      )
                      localStorage.setItem('product', JSON.stringify([...products]))
                    }
                  }}
                />

                <AddShoppingCartIcon
                  onClick={() => addToCart(product)}
                  className='absolute left'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Fav
