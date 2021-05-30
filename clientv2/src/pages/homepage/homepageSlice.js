import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch(`${backendDomain}/api/v1/products`);
    return await response.json();
  }
)

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchProducts.pending === 'products/fetchProducts/pending'
    builder.addCase(fetchProducts.pending, (state) => {
      state.allProducts = [];
      state.loading = "loading";
    });
    builder.addCase(
      fetchProducts.fulfilled, (state, { payload }) => {
        state.allProducts = payload.data;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default productsSlice;
