// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const persistedUser = localStorage.getItem("user");
const initialState = {
  user: persistedUser ? JSON.parse(persistedUser) : null,
  nickname: persistedUser ? JSON.parse(persistedUser).user_nicename : null,
  isAuthenticated: persistedUser ? true : false,
  error: null,
  loading: false,
  sessionTimeout: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.nickname = action.payload.user_display_name || null;
      state.sessionTimeout = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.nickname = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.nickname = null;
      localStorage.removeItem("user");
    },
    sessionTimeout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.nickname = null;
      state.sessionTimeout = true;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  sessionTimeout,
} = authSlice.actions;
export default authSlice.reducer;
