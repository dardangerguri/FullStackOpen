import { createSlice } from '@reduxjs/toolkit'

const filterAtStart = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterAtStart,
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions

export default filterSlice.reducer
