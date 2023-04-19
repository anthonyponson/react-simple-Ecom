import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const [products, setProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cartItems')) || []
    setProducts(storedProducts)
    setTotalPrice(
      storedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    )
  }, [])

  const addToCart = (product) => {
    const existingProduct = products.find((p) => p.id === product.id)
    if (existingProduct) {
      const newProducts = products.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity + 1 }
        } else {
          return p
        }
      })
      setProducts(newProducts)
      localStorage.setItem('cartItems', JSON.stringify(newProducts))
      setTotalPrice(totalPrice + product.price)
    } else {
      const newProduct = { ...product, quantity: 1 }
      setProducts([...products, newProduct])
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...products, newProduct])
      )
      setTotalPrice(totalPrice + product.price)
    }
  }

  const removeFromCart = (product) => {
    const existingProduct = products.find((p) => p.id === product.id)
    const newProducts = products.filter((p) => p.id !== product.id) // Filter out the product with the given ID
    setProducts(newProducts)
    localStorage.setItem('cartItems', JSON.stringify(newProducts))
    setTotalPrice(totalPrice - (existingProduct.price * existingProduct.quantity))
  }
  

  const gotohome = () => {
    navigate('/')
  }

  return (
    <>
      <div className='px-6'>
        <button onClick={gotohome}>Home</button>
        <h1>Cart:</h1>
        <div className='container mx-auto flex flex-col justify-center items-center md:flex-row'>
          {products.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            products.map((product) => (
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
                <div className='space-y-4 px-3 pb-5'>
                  <h2 className='text-white text-md font-bold'>
                    {product.name}
                  </h2>
                  <p className='text-white text-md font-bold'>
                    {product.Description}
                  </p>
                  <p className='text-white text-md font-bold'>
                    Price: {product.price}
                  </p>
                  {/* <input
                    className='text-center w-20 rounded-full mr-2'
                    type='number'
                    name='count'
                    value={product.quantity}
                    max='10'
                  /> */}

                  <input
                    className='text-center w-20 rounded-full mr-2'
                    type='number'
                    name='count'
                    value={product.quantity}
                    max='10'
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value)
                      const newProducts = products.map((p) => {
                        if (p.id === product.id) {
                          return { ...p, quantity: newQuantity }
                        } else {
                          return p
                        }
                      })
                      setProducts(newProducts)
                      localStorage.setItem(
                        'cartItems',
                        JSON.stringify(newProducts)
                      )
                      setTotalPrice(
                        newProducts.reduce(
                          (total, product) =>
                            total + product.price * product.quantity,
                          0
                        )
                      )
                    }}
                  />

                  <button
                    type='button'
                    onClick={() => removeFromCart(product)}
                    className='px-2 py-1 rounded-md bg-white text-gray-500 mr-2'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='text-center'>
          <p className='text-lg font-bold'>
            Total Price: <span className='text-emerald-600'>{totalPrice}</span>
          </p>
          <button
            className='bg-emerald-600 text-white py-2 px-4 rounded-lg mt-4'
            onClick={() => {
              alert('Thank you for your purchase!')
              localStorage.removeItem('cart')
              setProducts([])
              setTotalPrice(0)
            }}
            disabled={products.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
