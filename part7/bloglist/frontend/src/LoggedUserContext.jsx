import { createContext, useContext, useReducer, useState } from 'react'
import PropTypes from 'prop-types'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const LoggedUserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  )
}

LoggedUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useUserValue = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(
      'useUserValue must be used within a LoggedUserContextProvider',
    )
  }
  return context.user
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(
      'useUserDispatch must be used within a LoggedUserContextProvider',
    )
  }
  return context.userDispatch
}
