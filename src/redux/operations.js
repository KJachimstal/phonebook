import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        '/contacts',
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ token, name, phone }, thunkAPI) => {
    try {
      const response = await axios.post(
        '/contacts',
        { name, phone },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `/contacts/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, token, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/contacts/${id}`,
        {
          name,
          number,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
