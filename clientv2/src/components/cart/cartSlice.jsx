import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendDomain from "../../utils/backend";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await fetch(`${backendDomain}/api/v1/users/cart`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
});
export const addToCart = createAsyncThunk("cart/addToCart", async (data) => {
  const response = await fetch(`${backendDomain}/api/v1/users/cart`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: data,
    }),
  });
  return await response.json();
});
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTotal: 0,
    errors: "",
    loading: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    // addTocart.pending === "cart/addTocart/pending";
    builder.addCase(getCartItems.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getCartItems.fulfilled, (state, { payload }) => {
      state.cartItems = payload.data.products;
      state.cartTotal = payload.data.cartTotal;
      state.loading = "loaded";
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.cartItems = payload.data.products;
      state.cartTotal = payload.data.cartTotal;
      state.loading = "loaded";
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = "error";
      state.error = action.error.message;
    });
  },
});
export default cartSlice;
