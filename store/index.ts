import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import { apiSlice } from './slices/api/apiSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
