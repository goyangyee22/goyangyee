import { configureStore } from "@reduxjs/toolkit";
import diarySlice from "./diarySlice";

// slice가 여러개가 될 수도 있어서 이름을 달아줌 (ex: diary)
// 여기서 reducer의 diary는 App()의 state.diary.items
const store = configureStore({
  reducer: {
    diary: diarySlice.reducer,
  },
});

export default store;
