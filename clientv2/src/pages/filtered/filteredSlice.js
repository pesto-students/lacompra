import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'

export const fetchfilteredProducts = createAsyncThunk(
  'filteredProducts/fetchfilteredProducts',
  async () => {
    const response = await fetch(`${backendDomain}/api/v1/products`);
    return await response.json();
  }
)

export const filteredProductsSlice = createSlice({
  name: 'filteredProducts',
  initialState: {
    filteredProducts: [],
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchfilteredProducts.pending === 'filteredProducts/fetchfilteredProducts/pending'
    builder.addCase(fetchfilteredProducts.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchfilteredProducts.fulfilled, (state, { payload }) => {
        state.filteredProducts = payload.data;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchfilteredProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default filteredProductsSlice;
