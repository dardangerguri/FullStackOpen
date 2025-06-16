import { createSlice } from '@reduxjs/toolkit'

const notificationMessage = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationMessage,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },

    clearNotification() {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const showNotification = (message, duration) => {
  return dispatch => {
    dispatch(setNotification(message))

    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
