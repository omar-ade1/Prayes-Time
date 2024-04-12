import { createSlice } from '@reduxjs/toolkit'

export const CountrySlice = createSlice({
  initialState: [],
  name: "CountrySlice",
  reducers: {
    SetCountry: (state,action) => {
      return state = action.payload
    }
  }
})
export const { SetCountry } = CountrySlice.actions
export default CountrySlice.reducer