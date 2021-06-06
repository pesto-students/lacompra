import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'

export const loginUser = createAsyncThunk(
  "modal/loginUser",
  async (data) => {
    const response = await fetch(`${backendDomain}/api/v1/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
);

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    user: {},
    isLoggedIn: false,
    loading: "idle",
    error: "",
    modalState: "close"
  },
  reducers: {
    modalClose: (state) => {
      state.modalState = 'close';
    },
    modalOpen: (state) => {
      state.modalState = 'open';
    },
  },
  extraReducers: (builder) => {
    //loginUser.pending === 'filteredProducts/loginUser/pending'
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoggedIn = true;
        state.modalState = 'close'
        state.loading = "loaded";
      });
    builder.addCase(
      loginUser.rejected, (state, action) => {
        state.loading = "error";
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  }
});
export const { modalClose, modalOpen } = modalSlice.actions
export default modalSlice;