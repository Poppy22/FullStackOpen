import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const content = action.payload
      return content
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
