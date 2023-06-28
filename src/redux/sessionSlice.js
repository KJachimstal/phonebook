import { createSlice } from '@reduxjs/toolkit';
import { currentUser, signIn, singOut } from './session';

const sessionInitialState = {
  currentUser: {},
  isSignedIn: false,
  isLoading: false,
  error: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,

  extraReducers: {
    [signIn.pending](state) {
      state.isLoading = true;
      state.error = false;
    },
    [signIn.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      state.currentUser = action.payload;
      state.isSignedIn = true;
    },
    [signIn.rejected](state) {
      state.isLoading = false;
      state.error = true;
    },
    [singOut.pending](state) {
      state.isLoading = true;
    },
    [singOut.fulfilled](state) {
      state.currentUser = {};
      state.isLoading = false;
      state.isSignedIn = false;
      state.error = false;
    },
    [singOut.rejected](state) {
      state.error = true;
      state.isLoading = false;
    },
    [currentUser.pending](state) {
      state.isLoading = true;
      state.error = false;
    },
    [currentUser.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      state.currentUser = action.payload;
      state.isSignedIn = true;
    },
    [currentUser.rejected](state) {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const sessionReducer = sessionSlice.reducer;
