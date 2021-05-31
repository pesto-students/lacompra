import { createSlice } from '@reduxjs/toolkit'

const sidedrawerSlice = createSlice({
  name: 'sidedrawer',
  initialState: {
    status: "close",
    showComponent: "",
  },
  reducers: {
    sidedrawerOpen: (state, { payload }) => {
      state.status = "open";
      state.showComponent = payload;
    },
    sidedrawerClose: (state) => {
      state.status = "close";
      state.showComponent = "";
    }
  }
});
export const { sidedrawerOpen, sidedrawerClose } = sidedrawerSlice.actions;
export default sidedrawerSlice;