import { configureStore } from '@reduxjs/toolkit'
import productReducer from './pages/homepage/homepageSlice';

import topProductsSlice from './components/productCarousel/productCarouselSlice';
import sidedrawerSlice from './components/sidedrawer/sidedrawerSlice';
import wishlistSlice from './components/wishlist/wishlistSlice';
import cartSlice from './components/cart/cartSlice';
import rangeSlice from './components/range/rangeSlice';
import filterSidedrawerSlice from './components/filterSidedrawer/filterSidedrawerSlice';
import starSlice from './components/star/starSlice';
import modalSlice from './components/modal/modalSlice'

export default configureStore({
  reducer: {
    products: productReducer.reducer,
    topProducts: topProductsSlice.reducer,
    sidedrawer: sidedrawerSlice.reducer,
    wishlist: wishlistSlice.reducer,
    cart: cartSlice.reducer,
    rangeValue: rangeSlice.reducer,
    filterSidedrawer: filterSidedrawerSlice.reducer,
    star: starSlice.reducer,
    modal: modalSlice.reducer,
  },
})