import { createSlice } from '@reduxjs/toolkit';
import { currentUser, signIn, signUp, singOut } from './session';

const sessionInitialState = {
  currentUser: {},
  isSignedIn: false,
  isLoading: false,
  error: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInitialState,

  reducers: {
    resetErrors(state) {
      state.error = false;
    },
  },

  extraReducers: {
    [signIn.pending](state) {
      state.isLoading = true;
      state.error = false;
    },
    [signIn.fulfilled](state, action) {
      state.isLoading = false;
      state.error = false;
      state.currentUser = action.payload.user;
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
    [signUp.pending](state) {
      state.isLoading = true;
      state.error = false;
    },
    [signUp.fulfilled](state) {
      state.isLoading = true;
      state.error = false;
    },
    [signUp.rejected](state, action) {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

export const sessionReducer = sessionSlice.reducer;
