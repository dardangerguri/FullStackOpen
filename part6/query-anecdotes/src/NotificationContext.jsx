import { createContext, useReducer, useContext, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  const timeoutId = useRef(null)

  const setNotification = (message, duration) => {
    notificationDispatch({ type: "SET_NOTIFICATION", payload: message })

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      notificationDispatch({ type: "SET_NOTIFICATION", payload: null })
    }, duration * 1000)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
