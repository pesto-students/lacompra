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
export const registerUser = createAsyncThunk(
  "modal/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendDomain}/api/v1/users/signup`, {
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
export const logoutUser = createAsyncThunk(
  "modal/logoutUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendDomain}/api/v1/users/logout`, {
        method: "GET",
        credentials: "include",
      });
      const res = await response.json();
      if (res.status === "fail") {
        throw new Error(res.message)
      }
      toast.success(`Goodbye!`);
      return res;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message)
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "modal/fetchCurrentUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendDomain}/api/v1/users/me`, {
        method: "GET",
        credentials: "include",
      });
      const res = await response.json();
      if (res.status === "fail") {
        throw new Error(res.message)
      }
      return res;
    } catch (err) {
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
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      logoutUser.fulfilled, (state) => {
        state.user = {};
        state.isLoggedIn = false;
        state.loading = "loaded";
      });
    builder.addCase(
      logoutUser.rejected, (state, { payload }) => {
        state.loading = "error";
        state.isLoggedIn = false;
        state.error = payload;
      });
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoggedIn = true;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchCurrentUser.rejected, (state, { payload }) => {
        state.loading = "error";
        state.isLoggedIn = false;
        state.error = payload;
      });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.data;
        state.isLoggedIn = true;
        state.modalState = 'close'
        state.loading = "loaded";
      });
    builder.addCase(
      registerUser.rejected, (state, { payload }) => {
        state.loading = "error";
        state.isLoggedIn = false;
        state.error = payload;
      });
  }
});
export const { modalClose, modalOpen } = modalSlice.actions
export default modalSlice;