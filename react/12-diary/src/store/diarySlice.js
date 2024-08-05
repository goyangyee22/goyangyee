import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatas } from "../api/firebase";
const diarySlice = createSlice({
  name: "diary",
  initialState: {
    items: [],
    error: null,
    status: "welcome",
  },
  // reducers: 동기
  reducers: {},
  // extraReducers: 비동기
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "Complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "Failed";
      });
  },
});

const fetchItems = createAsyncThunk(
  "items/fetchAllItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("FETCH Error: ", error);
    }
  }
);

export default diarySlice;
export { fetchItems };
