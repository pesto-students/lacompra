import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import backendDomain from '../../utils/backend'
// todo : fix multiple option undo bug
const generateQuery = (queryObj) => {
  let queryStr = "?"
  for (let [key, value] of Object.entries(queryObj)) {
    if (Array.isArray(value)) {
      value = JSON.stringify(value)
    }
    queryStr = queryStr + key + "=" + value + "&";
  }
  return queryStr
}
export const fetchfilteredProducts = createAsyncThunk(
  'filteredSidedrawer/fetchfilteredProducts',
  async (data, { getState }) => {
    const previousQueryObj = getState().filterSidedrawer.queryObj;
    const finalQueryObj = { ...previousQueryObj, ...data };
    const currentQueryStr = generateQuery(finalQueryObj);
    const response = await fetch(`${backendDomain}/api/v1/products${currentQueryStr}`);
    const fetchedData = await response.json();
    return {
      fetchedData,
      queryObj: finalQueryObj,
    }
  },
  {
    condition: (data, { getState }) => {
      const fetchStatus = getState().filterSidedrawer.loading;
      if (fetchStatus === 'loading') {
        // in progress, don't need to re-fetch
        return false
      }
    }
  }
)
const initialState = {
  filteredProducts: [],
  queryObj: {},
  sortBy: {
    latest: true,
    "most popular": false,
    oldest: false
  },
  brands: {
    "Louis Philippe": false,
    "Van Heusen": false,
    "Allen Solly": false,
    "Peter England": false,
    "Park Avenue": false,
    "Monte Carlo": false,
    "Belmonte": false,
    "Oxemberg": false,
    "Provogue": false,
    "Indian Terrain": false,
  },
  allResults: 0,
  loading: "idle",
  error: "",
};
const filterSidedrawerSlice = createSlice({
  name: 'filteredSidedrawer',
  initialState,
  reducers: {
    updateSortBy: (state, { payload }) => {
      state.sortBy = payload;
    },
    updateBrands: (state, { payload }) => {
      state.brands = payload
    },
    resetAll: (state) => state = initialState,
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
export const { updateSortBy, updateBrands, resetAll } = filterSidedrawerSlice.actions
export default filterSidedrawerSlice;