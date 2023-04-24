
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { stateContext } from './Context'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const { state, dispatch } = useContext(stateContext)

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (state.isLoggedIn) {
  //     navigate('/home')
  //   }
  // }, [state.isLoggedIn, navigate])

  const userNameChange = (e) => {
    if (e.target.name === 'name') {
      setUserName(e.target.value)
    } else {
      setUserPassword(e.target.value)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (userName === '' || userPassword === '') return

    const user = state.userData.find(
      (item) => item.username === userName && item.password === userPassword
    )

    if (user) {      
      navigate('/home')
    } else {
      setShowPopup(true)
    }
  }

  return (
    <div>
      <div>
        <form
          className=" w-1/2 mt-44 flex items-center justify-center m-auto flex-col rounded-lg py-12 bg-emerald-400"
          onSubmit={handleClick}
        >
          <label className="text-blue">Username </label>
          <input
            className="rounded-full m-2 w-32 md:w-44 px-4 py-1 "
            value={userName}
            name="name"
            onChange={userNameChange}
            type="text"
          />
          {userName === '' && showPopup && <div> user name is required</div>}
          <label>Password</label>
          <input
            className=" rounded-full m-2 w-32 md:w-44 px-4 py-1 "
            value={userPassword}
            name="password"
            onChange={userNameChange}
            type="password"
          />
          {userPassword === '' && showPopup && (
            <div> user password is required</div>
          )}
          <button
          onClick={() => {
            dispatch({type: 'login', payload: {isLoggedIn: true}})
            localStorage.setItem('isLoggedIn', JSON.stringify(true))
          }}
            type="submit"
            className="bg-neutral-50 box-shadow p-2 px-6 mt-2 rounded-full mx-2"
          >
            Login
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>Invalid username or password</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login