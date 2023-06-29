import { createAsyncThunk } from "@reduxjs/toolkit";
import { userSingUp, userLogIn, userLogOut, getCurrentUser } from "../../api/api"


export const userSingUpThunk = createAsyncThunk(
  "auth/signUp",
  async ({ name, email, password }, thunkAPI) => {
    try {
      return userSingUp(name, email, password);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userLogInThunk = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      return userLogIn(email, password);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const userLogOutThunk = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      return userLogOut();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk(
  "auth/currentUser",
  async (_, thunkAPI) => {
    try {
      return getCurrentUser()
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

