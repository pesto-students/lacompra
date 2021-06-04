import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendDomain from '../../utils/backend'

export const fetchTopProducts = createAsyncThunk(
  'topProducts/fetchTopProducts',
  async () => {
    const response = await fetch(`${backendDomain}/api/v1/products?sort=-sold&limit=20`);
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