import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../utils/supabaseClient';

export const signIn = createAsyncThunk(
  'session/signIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      return {
        user: data.user,
        session: data.session,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || e);
    }
  }
);

export const singOut = createAsyncThunk(
  'session/singOut',
  async (_, thunkAPI) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return {};
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'session/signUp',
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      await thunkAPI.dispatch(signIn({ email, password }));

      return {
        user: data.user,
        session: data.session,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || e);
    }
  }
);

export const currentUser = createAsyncThunk(
  'session/currentUser',
  async (_, thunkAPI) => {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) throw error;

      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
