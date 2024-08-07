import { configureStore } from "@reduxjs/toolkit";
import foodSlice from "./foodSlice";

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
  },
});

export default store;
