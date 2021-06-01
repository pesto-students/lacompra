import { configureStore } from '@reduxjs/toolkit'
import productReducer from './pages/homepage/homepageSlice';
import topProductsSlice from './components/productCarousel/productCarouselSlice';
import sidedrawerSlice from './components/sidedrawer/sidedrawerSlice';
import wishlistSlice from './components/wishlist/wishlistSlice';
import cartSlice from './components/cart/cartSlice';



export default configureStore({
  reducer: {
    products: productReducer.reducer,
    topProducts: topProductsSlice.reducer,
    sidedrawer: sidedrawerSlice.reducer,
    wishlist: wishlistSlice.reducer,
    cart: cartSlice.reducer

  },
})