import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'utils/api';

export const signIn = createAsyncThunk(
  'session/singIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post(
        '/users/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const singOut = createAsyncThunk(
  'session/singOut',
  async (_, thunkAPI) => {
    try {
      const response = await api.post('/users/logout');
      localStorage.removeItem('userToken');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'session/signUp',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await api.post(
        '/users/signup',
        {
          name,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      thunkAPI.dispatch(signIn({ email, password }));
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.errors);
    }
  }
);

export const currentUser = createAsyncThunk(
  'session/currentUser',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/users/current');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
