import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteData,
  deleteDatas,
  getDatasOrderByLimit,
  updateDatas,
} from "../api/firebase";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: [],
    lq: undefined,
    isLoading: false,
    loadingError: "",
    order: "createdAt",
    hasNext: true,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
      state.items = [];
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
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
        state.isLoading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        // if (action.payload.isReset) {
        //   state.items = action.payload.resultData;
        // } else {
        //   action.payload.resultData.forEach((data) => {
        //     state.items.push(data);
        //   });
        // }
        // action.payload.resultData.forEach((data) => {
        //   state.items.push(data);
        // });
        state.items = [...state.items, ...action.payload.resultData];
        // if (!action.payload.lastQuery) {
        //   state.hasNext = false;
        // } else {
        //   state.hasNext = true;
        // }
        // state.hasNext = action.payload.lastQuery ? true : false;
        state.hasNext = !!action.payload.lastQuery;
        state.lq = action.payload.lastQuery;
        state.isLoading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingError = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.isLoading = false;
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

const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasOrderByLimit(
        collectionName,
        queryOptions
      );
      resultData.isReset = !queryOptions.lastQuery ? true : false;
      return resultData;
    } catch (error) {
      return "FETCH Error: ", error;
      // console.error("FETCH Error", error);
    }
  }
);

const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ collectionName, docId, updateObj, imgUrl }) => {
    try {
      const resultData = await updateDatas(
        collectionName,
        docId,
        updateObj,
        imgUrl
      );
      return resultData;
    } catch (error) {
      return "UPDATE Error: " + error;
    }
  }
);

const deleteItem = createAsyncThunk(
  "items/deleteItemsAsync",
  async ({ collectionName, docId, imgUrl }) => {
    try {
      await deleteDatas(collectionName, docId, imgUrl);
      console.log(docId);
      return docId;
    } catch (error) {
      console.error("DELETE Error: ", error);
    }
  }
);

// const deleteItem = createAsyncThunk(
//   "items/deleteItem",
//   async ({ collectionName, docId, imgUrl }) => {
//     try {
//       const resultData = await deleteDatas(collectionName, docId, imgUrl);
//       return resultData;
//     } catch (error) {
//       return "DELETE Error: " + error;
//     }
//   }
// );

export default foodSlice;
export { fetchItems, updateItem, deleteItem };
export const { setOrder, setHasNext } = foodSlice.actions;
