import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for adding a jour entry
export const addJour = createAsyncThunk(
  'jour/addJour',
  async (jourData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/jour', jourData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jourSlice = createSlice({
  name: 'jour',
  initialState: {
    jours: [],
    status: null,
    error: null
  },
  reducers: {},
  extraReducers: {
    [addJour.pending]: (state) => {
      state.status = 'loading';
    },
    [addJour.fulfilled]: (state, action) => {
      state.jours.push(action.payload);
      state.status = 'succeeded';
    },
    [addJour.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  }
});

export default jourSlice.reducer;
