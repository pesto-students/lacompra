import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTopProducts = createAsyncThunk(
  'topProducts/fetchTopProducts',
  async () => {
    const response = await fetch('http://localhost:5000/api/v1/products?sort=-sold');
    return await response.json();
  }
)

const topProductsSlice = createSlice({
  name: 'topProducts',
  initialState: {
    topProducts: [],
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopProducts.pending, (state) => {
      state.topProducts = [];
      state.loading = "loading";
    });
    builder.addCase(
      fetchTopProducts.fulfilled, (state, { payload }) => {
        state.topProducts = payload.data;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchTopProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default topProductsSlice;