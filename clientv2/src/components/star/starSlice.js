import { createSlice } from '@reduxjs/toolkit';


const starSlice = createSlice({
  name: 'stars',
  initialState: {
    starsSelected: 0,
  },
  reducers: {
    setStarsSelected: (state, { payload }) => {
      state.starsSelected = payload
    }
  },
  extraReducers: (builder) => {

  }
});
export const { setStarsSelected } = starSlice.actions
export default starSlice;