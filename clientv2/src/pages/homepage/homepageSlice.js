import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://lacompra-beta.herokuapp.com/api/v1/products');
    return response.data
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchProducts.pending === 'products/fetchProducts/pending'
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.loading = "loading";
    });
    builder.addCase(
      fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
})


export default productsSlice;
