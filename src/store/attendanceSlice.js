import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAttendances = createAsyncThunk('attendance/fetchAttendances', async () => {
  const response = await fetch('http://localhost:3001/api/attendances');
  if (!response.ok) throw new Error('Failed to fetch');
  return await response.json();
});

export const deleteAllAttendances = createAsyncThunk('attendance/deleteAllAttendances', async () => {
  const response = await fetch('http://localhost:3001/api/attendances/all', { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete');
  return await response.json();
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.data = action.payload.map(att => ({ ...att, id: att._id })); // Ensuring we convert _id to id if necessary
        state.status = 'succeeded';
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error || 'Failed to fetch attendances';
      })
      .addCase(deleteAllAttendances.fulfilled, (state) => {
        state.data = [];
      });
  }
});

export default attendanceSlice.reducer;
