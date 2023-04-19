import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import images from './products.json'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'

function Home() {
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('product')) || []
    setProducts(storedProducts)
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
    setFavorites(storedFavorites)
  }, [])

  const gotohome = () => {
    navigate('/')
  }

  const addToFavorites = (product) => {
    const isFavorite = favorites.find((fav) => fav.id === product.id)
    if (isFavorite) {
      const newFavorites = favorites.filter((fav) => fav.id !== product.id)
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      setFavorites([...favorites, product])
      localStorage.setItem('favorites', JSON.stringify([...favorites, product]))
    }
  }

  const addToCart = (product) => {
    setIsAddingToCart(true) // set the state to trigger the animation
    setTimeout(() => {
      setIsAddingToCart(false) // reset the state after the animation finishes
    }, 1000)

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [] // get existing items or initialize an empty array
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    ) // check if product already exists in cart

    if (product.quantity <= 0) {
      return
    }

    if (existingProductIndex !== -1) {
      // if product already exists in cart, update its quantity
      cartItems[existingProductIndex].quantity += product.quantity
    } else {
      cartItems.push(product) // add the product to the array
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems)) // save the array to local storage
  }

  return (
    <>
      <div className='px-6'>
        <button onClick={gotohome}>Home</button>
        <h1>Products:</h1>
        {/* <p>{images[i].url}</p> */}
        {/* {images.map((img) =>
                img.id === product.id ? (
                  <img src={img.url} alt="" srcset="" />
                ) : (
                  <img src="" alt="" />
                )
              )} */}
        {/* <img src={images[i].url} alt="" srcset="" /> */}
        <div className='container mx-auto flex flex-col justify-center items-center md:flex-row'>
          {products.map((product, i) => (
            <div
              key={product.id}
              className='md:w-1/3 flex flex-col bg-emerald-400 m-2 space-y-2 shadow-lg rounded-lg'
            >
              <img
                style={{ height: '350px', width: '430px' }}
                className=''
                src={product.image}
                alt={product.id}
              />
              <div id='icon' className='relative'>
                <FavoriteIcon
                  className='text-white absolute top-1 left cursor-pointer'
                  onClick={() => addToFavorites(product)}
                  style={{
                    color: favorites.find((fav) => fav.id === product.id)
                      ? 'red'
                      : 'white',
                  }}
                />
              </div>
              <div className='space-y-4 px-3 pb-5'>
                <h2 className='text-white text-md font-bold'>{product.name}</h2>
                <p className='text-white text-md font-bold'>
                  {product.Description}
                </p>
                <p className='text-white text-md font-bold'>
                  Price: {product.price}
                </p>
                <div className='flex items-center relative'>
                  <input
                    className='text-center w-20 rounded-full mr-2'
                    type='number'
                    name='count'
                    max='10'  
                    value={product.quantity}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value, 10)
                      if (newValue >= 0) {
                        const updatedProduct = {
                          ...product,
                          quantity: newValue,
                        }
                        const updatedProducts = products.map((p) =>
                          p.id === product.id ? updatedProduct : p
                        )
                        setProducts(updatedProducts)
                        localStorage.setItem(
                          'products',
                          JSON.stringify(updatedProducts)
                        )
                      }
                    }}
                  />

                  <AddShoppingCartIcon
                    onClick={() => addToCart(product)}
                    className='absolute left'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home