import React, { useState, useEffect } from 'react'
// import '../src/assets/css/index.css'

function Product() {
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [value, setValue] = useState(0)
  const [isFormSubmited, setIsFormSubmited] = useState(false)
  const [product, setProduct] = useState([])

  const STOREDPRODUCTS = 'product'

  useEffect(() => {
    let products = JSON.parse(localStorage.getItem(STOREDPRODUCTS)) || []
    setProduct(products)
  }, [])

  const inputChange = (e) => {
    const { name, value } = e.target
    if (name === 'name') {
      setName(value)
    } else if (name === 'des') {
      setDes(value)
    } else if (name === 'price') {
      setPrice(value)
    } else if (name === 'image') {
      setImage(value)
    } else if (name === 'count') {
      const newValue = parseInt(value, 10)
      if (newValue > 0 && newValue <= 10) {
        setValue(newValue)
      }
    }
  }

  const renderProduct = (e) => {
    e.preventDefault()
    setIsFormSubmited(true)
    if (name === '' || des === '' || price === '') return

    const newProduct = {
      id: Date.now().toString(),
      name: name,
      Description: des,
      price: price,
      quantity: value,
      image: image,
      favorite: false,
      cart: false,
    }

    // Retrieve existing products from localStorage, if any
    let existingProducts = localStorage.getItem(STOREDPRODUCTS) || '[]'
    existingProducts = JSON.parse(existingProducts)

    // Merge the new product with the existing products and store back to localStorage
    const updatedProducts = [...existingProducts, newProduct]
    localStorage.setItem(STOREDPRODUCTS, JSON.stringify(updatedProducts))

    // Update the state and input fields
    setProduct(updatedProducts)
    setName('')
    setDes('')
    setImage('')
    setPrice('')
    setValue(0)
    setIsFormSubmited(false)
  }

  return (
    <>
      <div className="p-4 flex justify-center">
        <form onSubmit={renderProduct} className="flex flex-col space-y-2">
          <label className="font-medium">Product Name</label>
          <input
            className="border-2 border-green-500 p-2 rounded-full"
            onChange={inputChange}
            type="text"
            value={name}
            name="name"
          />
          {name === '' && isFormSubmited && (
            <div className="task-dev">product name required</div>
          )}

          <label className="font-medium">Product Description</label>
          <input
            className="border-2 border-green-500 p-2 rounded-full"
            onChange={inputChange}
            type="text"
            value={des}
            name="des"
          />
          {des === '' && isFormSubmited && (
            <div className="task-dev">product description required</div>
          )}
          <label className="font-medium">Product Price</label>
          <input
            className="border-2 border-green-500 p-2 rounded-full"
            onChange={inputChange}
            type="number"
            value={price}
            name="price"
          />
          {price === '' && isFormSubmited && (
            <div className="task-dev">price required</div>
          )}
          <label className="font-medium">Image Url</label>
          <input
            className="border-2 border-green-500 p-2 rounded-full"
            onChange={inputChange}
            type="text"
            value={image}
            name="image"
          />
          <div className="flex items-center justify-center space-x-2">
            
            <input
              className="border-2 border-green-500 w-16 text-center rounded-full"
              type="number"
              value={value}
              onChange={inputChange}
              min="1"
              max="10"
              name="count"
            />
            
          </div>
          <input
            type="submit"
            className="px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600"
            Submit
          />
        </form>
      </div>
    </>
  )
}

export default Product
