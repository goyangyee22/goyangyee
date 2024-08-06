import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, // 유저 정보
    isAuthenticated: false, // 로그인 상태
    error: null, // 에러 메세지
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;

      state.error = null;
    },
  },
});

export default userSlice;
export const { login, logout } = userSlice.actions;
