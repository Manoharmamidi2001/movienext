import { configureStore } from '@reduxjs/toolkit'
import { movieNextReducer } from './movieNextSlice'

export const store = configureStore({
  reducer: {
    movieData: movieNextReducer
  }
})