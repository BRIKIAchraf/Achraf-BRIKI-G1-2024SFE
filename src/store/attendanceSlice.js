// src/features/attendance/attendanceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching attendances
export const fetchAttendances = createAsyncThunk(
  'attendance/fetchAttendances',
  async () => {
    const response = await fetch('http://127.0.0.1:42345/api/attendances');
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  }
);

// Async thunk for deleting all attendances
export const deleteAllAttendances = createAsyncThunk(
  'attendance/deleteAllAttendances',
  async () => {
    const response = await fetch('http://127.0.0.1:42345/api/attendances/all', { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete');
    return await response.json(); // Assuming the API returns the updated list
  }
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteAllAttendances.fulfilled, (state) => {
        state.data = [];
      });
  }
});

export default attendanceSlice.reducer;
