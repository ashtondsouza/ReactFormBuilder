import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isOpen: false,
    activeElementId: null,
  },
  reducers: {
    openDrawer: (state, action) => {
      const { id } = action.payload
      state.isOpen = true
      state.activeElementId = id
    },

    closeDrawer: (state) => {
      state.isOpen = false
      console.log("ehe")
    },
  },
})

export const { openDrawer, closeDrawer } = drawerSlice.actions
export default drawerSlice.reducer
