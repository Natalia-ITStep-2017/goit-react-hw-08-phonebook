import { createSlice } from "@reduxjs/toolkit";
import { getContactsThunk, addContactThunk, deleteContactThunk } from "./contactOperations";
import {
  handlePending,
  handleRejected,
  handleFetchContactsFulfilled,
  handleAddContactFulfilled,
  handleDeleteContactFulfilled
} from "./contactHandlers";



const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContactsThunk.fulfilled, handleFetchContactsFulfilled)
      .addCase(addContactThunk.fulfilled, handleAddContactFulfilled)
      .addCase(deleteContactThunk.fulfilled, handleDeleteContactFulfilled)
      .addMatcher((action) => {
        action.type.endsWith('/pending')
      }, handlePending)
      .addMatcher((action) => {
        action.type.endsWith('/rejected')
      }, handleRejected)
  }

});

export const contactsReducer = contactsSlice.reducer;