import { createSlice } from '@reduxjs/toolkit'

const notificationMessage = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notificationMessage,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },

    clearNotification() {
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(showNotification(message))

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
