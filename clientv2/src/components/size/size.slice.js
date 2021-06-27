import { createSlice } from '@reduxjs/toolkit';


const sizeSlice = createSlice({
  name: 'size',
  initialState: {
    currentSize: 's',
    currentCount: '1'
  },
  reducers: {
    setSizeValue: (state, { payload }) => {
      state.currentSize = payload
    },
    setCountValue: (state, { payload }) => {
      state.currentCount = payload

    }
  },
  extraReducers: (builder) => {

  }
});
export const { setSizeValue, setCountValue } = sizeSlice.actions
export default sizeSlice;