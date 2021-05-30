import { createSlice } from '@reduxjs/toolkit'

const sidedrawerSlice = createSlice({
  name: 'sidedrawer',
  initialState: {
    status: "close",
  },
  reducers: {
    sidedrawerOpen: (state) => {
      state.status = "open";
    },
    sidedrawerClose: (state) => {
      state.status = "close";
    }
  }
});
export const { sidedrawerOpen, sidedrawerClose } = sidedrawerSlice.actions;
export default sidedrawerSlice;