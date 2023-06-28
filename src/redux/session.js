import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const signIn = createAsyncThunk(
  'session/singIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
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
      const token = localStorage.getItem('userToken');
      const response = await axios.post(
        '/users/logout',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
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
      const response = await axios.post(
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
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'session/currentUser',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get('/users/current', {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
