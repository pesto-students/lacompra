import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

import backendDomain from '../../utils/backend'

export const uploadProduct = createAsyncThunk(
  'productUpload/uploadProduct',
  async (data, { rejectWithValue, getState }) => {
    const user = getState().modal.user.doc.id;
    const response = await fetch(`${backendDomain}/api/v1/products`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, user }),
    });
    const value = await response.json();
    if (value.status >= 400) {
      return rejectWithValue(value.message)
    }
    return value;
  }
)

const initialState = {
  loading: "idle",
  error: "",
};
const productUploadSlice = createSlice({
  name: 'productUpload',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(uploadProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      uploadProduct.fulfilled, (state, { payload }) => {
        // state.images.push(payload);
        state.loading = "loaded";
      });
    builder.addCase(
      uploadProduct.rejected, (state, action) => {
        toast.error(action.payload);
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});
// export const { } = productUploadSlice.actions
export default productUploadSlice;