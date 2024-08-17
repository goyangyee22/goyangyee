import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDatasRest } from "../../api";

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatasRest(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return null;
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
export { fetchProducts };
