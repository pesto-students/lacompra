import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'

export const fetchSingleProduct = createAsyncThunk(
  'productDetails/fetchSingleProduct',
  async (id) => {
    const response = await fetch(`${backendDomain}/api/v1/products/${id}`);
    return await response.json();
  }
)
export const deleteProduct = createAsyncThunk("productDetails/deleteProduct", async (id) => {
  const response = await fetch(`${backendDomain}/api/v1/products/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: {},
    loading: "idle",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchSingleProduct.fulfilled, (state, { payload }) => {
        state.product = payload;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchSingleProduct.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});

export default productDetailsSlice;
