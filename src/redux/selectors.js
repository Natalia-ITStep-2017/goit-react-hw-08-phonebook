import { createSelector } from "@reduxjs/toolkit";

export const getContacts = state => state.contacts.contacts;
export const getFilter = state => state.filter.filter;
export const getIsLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
export const selectToken = state => state.auth.token
export const selectUser = state => state.auth.user
export const selectIsLoadingAuth = state => state.auth.isLoading;
export const selectErrorAuth = state => state.auth.error;

export const getFilteredContacts = createSelector([getContacts, getFilter], (contacts, filter) => {
  if (contacts) {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()))
  }
})