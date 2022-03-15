import { createSlice } from '@reduxjs/toolkit'

const initialState = { timeoutId: null, content: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    show(state, action) {
      const content = action.payload
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return content
    },
    hide: () => ({ ...initialState }),
  },
})

export const { show, hide } = notificationSlice.actions
export default notificationSlice.reducer
