import { createSlice } from '@reduxjs/toolkit';


const rangeSlice = createSlice({
  name: 'range',
  initialState: {
    rangeValue: [1, 1000],
  },
  reducers: {
    setRangeValue: (state, { payload }) => {
      state.rangeValue = payload
    }
  },
  extraReducers: (builder) => {

  }
});
export const { setRangeValue } = rangeSlice.actions
export default rangeSlice;