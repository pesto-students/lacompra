import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendDomain from "../../utils/backend";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (data) => {
    const response = await fetch(`${backendDomain}/api/v1/users/wishlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: data,
      }),
    });
    return await response.json();
  }
);
export const deleteFromWishlist = createAsyncThunk(
  "wishlist/deleteFromWishlist",
  async (data) => {
    const response = await fetch(`${backendDomain}/api/v1/users/wishlist`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: data,
      }),
    });
    return await response.json();
  }
);

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async () => {
    const response = await fetch(`${backendDomain}/api/v1/users/wishlist`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    errors: "",
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    // addToWishlist.pending === "wishlist/addToWishlist/pending";
    builder.addCase(addToWishlist.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(addToWishlist.fulfilled, (state, { payload }) => {
      state.wishlist = payload.data.wishlist;
      state.loading = "loaded";
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    builder.addCase(getWishlist.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getWishlist.fulfilled, (state, { payload }) => {
      state.wishlistItems = payload.data.wishlist;
      state.loading = "loaded";
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteFromWishlist.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteFromWishlist.fulfilled, (state, { payload }) => {
      state.wishlistItems = payload.data.wishlist;
      state.loading = "loaded";
    });
    builder.addCase(deleteFromWishlist.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});
// export const { wishlistOpen, wishlistClose } = wishlistSlice.actions;
export default wishlistSlice;
