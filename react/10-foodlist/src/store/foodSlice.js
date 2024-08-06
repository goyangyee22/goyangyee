import { createSlice } from "@reduxjs/toolkit";
import { deleteData, getDatas, getSearchDatas, updateData } from "../api/firebase";

const foodSlice = createSlice({
  name: "foodlist",
  initialState: {
    items: [],
    searchedItems: [],
    lq: null,
    hasNext: true,
    isLoading: false,
    loadingError: null,
  },
  reducers: {
    setLq(state, action) {
      state.lq = action.payload;
    },
    setHasNext(state, action) {
      state.hasNext = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setLoadingError(state, action) {
      state.loadingError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.items = action.payload.resultData;
        state.lq = action.payload.lastQuery;
        state.hasNext = !!action.payload.lastQuery;
        state.isLoading = false;
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.loadingError = action.payload;
        state.items = false;
      })
      .addCase(searchItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchItems.fulfilled, (state, action) => {
        state.searchItems = action.payload;
        state.isLoading = false;
      })
      .addCase(searchItems.rejected, (state, action) => {
        state.loadingError = action.payload;
        state.isLoading = false;
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.items[index] = updatedItem;
        }
      })
      .addCase(
        deleteItemAsync.fulfilled,
        (state,
        (action) => {
          const docId = action.payload;
          state.items = state.items.filter((item) => item.docId !== docId);
        })
      );
  },
});

const loadItems = createAsyncThunk(
  "items/loadItems",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log("LOAD Error: ", error);
    }
  }
);

const searchItems = createAsyncThunk(
  "items/searchItems",
  async ({ collectionName, keyword, queryOptions }) => {
    try {
      const resultData = await getSearchDatas(collectionName, {
        ...queryOptions,
        keyword,
      });
      return resultData;
    } catch (error) {
      console.log("SEARCH Error: ", error);
    }
  }
);

const addItemsAsync = createAsyncThunk("items/addItemsAsync", async (item) => {
  try{
    const resultData = await addData
  } catch (error){
    console.log("ADD Error: ", error);
  }
})

const updateItemAsync = createAsyncThunk("items/updateItemsAsync", async (item) => {
  try{
    const updatedData = await updateData(item);
    return updatedData;
  } catch (error) {
    console.log("UPDATE Error: ", error);
  }
})

const deleteItemAsync = createAsyncThunk("items/deleteItemsAsync", async (docId) => {
  try{
await deleteData(docId);
return docId;
  } catch (error){
    console.error("DELETE Error: ", error);
  }
})

export const { setLq, setHasNext, setLoading, setLoadingError } =
  foodSlice.actions;
export default foodSlice.reducer;
