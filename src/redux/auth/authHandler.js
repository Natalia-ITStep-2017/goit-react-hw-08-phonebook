export const handlePending = state => {
  state.isLoading = true;
};
export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const handleSignUpFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.token = `Bearer ${action.payload.token}`;
  state.user = action.payload.user

};

export const handleLogInFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.token = `Bearer ${action.payload.token}`;
  state.user = action.payload.user
};

export const handleLogOutFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
  state.token = null;
  state.user = null
};

export const handleGetCurrentUserFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.user = action.payload
};


