import { configureStore } from '@reduxjs/toolkit'
import productReducer from './pages/homepage/homepageSlice';

export default configureStore({
  reducer: {
    products: productReducer.reducer,
  },
})