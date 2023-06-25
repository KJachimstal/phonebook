import { createSlice } from '@reduxjs/toolkit';
import { signIn } from './session';

const sessionInitialState = {
  currentUser: null,
  isSignedIn: false,
  isLoading: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,

  extraReducers: {
    [signIn.pending](state) {
      state.isLoading = true;
      state.error = null;
    },
    [signIn.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
      state.isSignedIn = true;
    },
    [signIn.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const sessionReducer = sessionSlice.reducer;
