import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

import backendDomain from '../../utils/backend'

export const uploadImages = createAsyncThunk(
  'image/uploadImages',
  async (data, { rejectWithValue }) => {

    const response = await fetch(`${backendDomain}/api/v1/cloudinary/uploadimages`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: data,
      }),
    });
    const value = await response.json();
    if (value.status >= 400) {
      return rejectWithValue(value.message)
    }
    return value;
  }
)

export const removeImage = createAsyncThunk(
  'image/removeImage',
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${backendDomain}/api/v1/cloudinary/removeimage`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: data,
      }),
    });
    const value = await response.json();
    if (value.status.result !== "ok") {
      return rejectWithValue(value.status.result)
    }
    return data;
  }
)
const initialState = {
  images: [],
  loading: "idle",
  error: "",
};
const fileUploadSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(uploadImages.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      uploadImages.fulfilled, (state, { payload }) => {
        state.images.push(payload);
        state.loading = "loaded";
      });
    builder.addCase(
      uploadImages.rejected, (state, action) => {
        toast.error(action.payload);
        state.loading = "error";
        state.error = action.error.message;
      });
    builder.addCase(removeImage.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      removeImage.fulfilled, (state, { payload }) => {
        state.images = state.images.filter(image => image.public_id !== payload);
        state.loading = "loaded";
      });
    builder.addCase(
      removeImage.rejected, (state, action) => {
        toast.error(action.payload);
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});
export const { } = fileUploadSlice.actions
export default fileUploadSlice;