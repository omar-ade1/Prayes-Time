import { configureStore } from '@reduxjs/toolkit'
import TimeSlice from './slices/TimeSlice'
import CountrySlice from './slices/CountrySlice'

export const store = configureStore({
  reducer: {
    PrayTime: TimeSlice,
    CountryInfo : CountrySlice
  }
})