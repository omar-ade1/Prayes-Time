import { createSlice } from '@reduxjs/toolkit'

export const TimeSlice = createSlice({
  initialState: [],
  name: "TimeSlice",
  reducers: {
    ChangeTimePray: (state,action) => {
      return state = action.payload
    }
  }
})
export const { ChangeTimePray } = TimeSlice.actions
export default TimeSlice.reducer