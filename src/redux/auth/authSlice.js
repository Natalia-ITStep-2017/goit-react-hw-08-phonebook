import { createSlice } from "@reduxjs/toolkit";
import {
  userSingUpThunk,
  userLogInThunk,
  userLogOutThunk,
  getCurrentUserThunk
} from "../auth/uathOperations";
import {
  handlePending,
  handleRejected,
  handleSignUpFulfilled,
  handleLogInFulfilled,
  handleLogOutFulfilled,
  handleGetCurrentUserFulfilled
} from "../auth/authHandler";



const authSlice = createSlice({
  name: "uath",
  initialState: {
    token: null,
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logOut: (state) => {
      state.token = null
      state.isLoading = false
      state.error = null
      state.user = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userSingUpThunk.fulfilled, handleSignUpFulfilled)
      .addCase(userLogInThunk.fulfilled, handleLogInFulfilled)
      .addCase(userLogOutThunk.fulfilled, handleLogOutFulfilled)
      .addCase(getCurrentUserThunk.fulfilled, handleGetCurrentUserFulfilled)
      .addMatcher((action) => {
        action.type.endsWith('/pending')
      }, handlePending)
      .addMatcher((action) => {
        action.type.endsWith('/rejected')
      }, handleRejected)
  }

});

export const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions