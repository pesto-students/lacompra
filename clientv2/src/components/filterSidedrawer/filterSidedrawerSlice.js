import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'

const generateQuery = (queryObj) => {
  let queryStr = "?"
  for (const [key, value] of Object.entries(queryObj)) {
    queryStr = queryStr + key + "=" + value + "&";
  }
  return queryStr
}
export const fetchfilteredProducts = createAsyncThunk(
  'filteredSidedrawer/fetchfilteredProducts',
  async (data, { getState }) => {
    const finalQuery = { ...getState().filterSidedrawer.queryObj, ...data }
    const response = await fetch(`${backendDomain}/api/v1/products${generateQuery(finalQuery)}`);
    const fetchedData = await response.json();
    const queryObj = finalQuery;
    return {
      fetchedData,
      queryObj
    }
  }
)

const filterSidedrawerSlice = createSlice({
  name: 'filteredSidedrawer',
  initialState: {
    filteredProducts: [],
    queryObj: {},
    allResults: 0,
    loading: "idle",
    error: "",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    //fetchfilteredProducts.pending === 'filteredProducts/fetchfilteredProducts/pending'
    builder.addCase(fetchfilteredProducts.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(
      fetchfilteredProducts.fulfilled, (state, { payload }) => {
        state.filteredProducts = payload.fetchedData.data;
        state.queryObj = payload.queryObj;
        state.allResults = payload.fetchedData.allResults;
        state.loading = "loaded";
      });
    builder.addCase(
      fetchfilteredProducts.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.error.message;
      });
  }
});
export default filterSidedrawerSlice;