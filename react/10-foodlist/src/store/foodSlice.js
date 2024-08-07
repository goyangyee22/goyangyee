import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatasOrderByLimit } from "../api/firebase";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    lq: undefined,
    isLoading: "idle",
    loadingError: "",
    // searchedItems: [],
    // hasNext: true,
  },
  reducers: {
    // setLq(state, action) {
    //   state.lq = action.payload;
    // },
    // setHasNext(state, action) {
    //   state.hasNext = action.payload;
    // },
    // setIsLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
    // setLoadingError(state, action) {
    //   state.loadingError = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.isLoading = "Loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = "complete";
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.items = state.isLoading = "fail";
        state.loadingError = action.payload;
      });
  },
});

// const loadItems = createAsyncThunk(
//   "items/loadItems",
//   async ({ collectionName, queryOptions }) => {
//     try {
//       const resultData = await getDatas(collectionName, queryOptions);
//       return resultData;
//     } catch (error) {
//       console.log("LOAD Error: ", error);
//     }
//   }
// );

// const searchItems = createAsyncThunk(
//   "items/searchItems",
//   async ({ collectionName, keyword, queryOptions }) => {
//     try {
//       const resultData = await getSearchDatas(collectionName, {
//         ...queryOptions,
//         keyword,
//       });
//       return resultData;
//     } catch (error) {
//       console.log("SEARCH Error: ", error);
//     }
//   }
// );

// const addItemsAsync = createAsyncThunk("items/addItemsAsync", async (item) => {
//   try {
//     const resultData = await addData(item);
//     return resultData;
//   } catch (error) {
//     console.log("ADD Error: ", error);
//   }
// });

// const updateItemAsync = createAsyncThunk(
//   "items/updateItemsAsync",
//   async (item) => {
//     try {
//       const updatedData = await updateData(item);
//       return updatedData;
//     } catch (error) {
//       console.log("UPDATE Error: ", error);
//     }
//   }
// );

// const deleteItemAsync = createAsyncThunk(
//   "items/deleteItemsAsync",
//   async (docId) => {
//     try {
//       await deleteData(docId);
//       return docId;
//     } catch (error) {
//       console.error("DELETE Error: ", error);
//     }
//   }
// );

const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasOrderByLimit(
        collectionName,
        queryOptions
      );
      return resultData;
    } catch (error) {
      return "FETCH Error: ", error;
      // console.error("FETCH Error", error);
    }
  }
);

export default foodSlice;
// export const { setLq, setHasNext, setLoading, setLoadingError } =
//   foodSlice.actions;
