import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../utils/supabaseClient';
import { updateContactItem } from './actions';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name,
            phone: number,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ id }, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          name,
          phone: number,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      thunkAPI.dispatch(updateContactItem(data));
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
