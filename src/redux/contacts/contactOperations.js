import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContacts, addContact, editContact, deleteContact } from "../../api/api"


export const getContactsThunk = createAsyncThunk(
  "contacts/getContacts",
  async (_, thunkAPI) => {
    try {
      return getContacts();
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  "contacts/addContact",
  async ({ name, number }, thunkAPI) => {
    try {
      return addContact(name, number);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      return deleteContact(id)
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);


export const editContactThunk = createAsyncThunk(
  "contacts/editContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      return editContact(id, name, number)
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);