export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,

  userData: [
    {
      id: 1,
      username: 'tony',
      password: '123'
    },
    {
      id: 2,
      username: 'stark',
      password: '123'
    }
  ]
}

export const stateReducer = (state, action) => {
  console.log('state', state, 'action', action)
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: action.payload
      }
    default:
      return state
  }
}