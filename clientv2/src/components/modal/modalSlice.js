import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import backendDomain from '../../utils/backend'

export const loginUser = createAsyncThunk(
  "modal/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendDomain}/api/v1/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.status === "fail") {
        throw new Error(res.message)
      }
      toast.success(`Welcome, ${res.data.user.name}`);
      return res;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message)
    }
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
      state.loading = 'idle';
      state.error = "";
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
      loginUser.rejected, (state, { payload }) => {
        state.loading = "error";
        state.isLoggedIn = false;
        state.error = payload;
      });
  }
});
export const { modalClose, modalOpen } = modalSlice.actions
export default modalSlice;