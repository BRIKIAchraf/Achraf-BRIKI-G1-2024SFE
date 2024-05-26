// store/dashboardSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStats = createAsyncThunk('dashboard/fetchStats', async () => {
  const response = await axios.get('https://schoolomegup-api.onrender.com/api/dashboard/stats');
  return response.data;
});

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default dashboardSlice.reducer;
