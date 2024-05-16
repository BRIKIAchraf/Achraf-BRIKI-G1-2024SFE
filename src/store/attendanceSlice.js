import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchAttendances = createAsyncThunk('attendances/fetchAttendances', async (_, { rejectWithValue }) => {
  try {
    console.log('Fetching attendances...');
    const response = await axios.get('http://localhost:3001/api/attendances');
    console.log('Fetch attendances response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching attendances:', error);
    return rejectWithValue(error.response ? error.response.data : 'Error fetching attendances');
  }
});

const attendanceSlice = createSlice({
  name: 'attendances',
  initialState: {
    attendances: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        console.log('Fetch attendances pending');
        state.status = 'loading';
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        console.log('Fetch attendances fulfilled:', action.payload);
        state.attendances = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        console.error('Fetch attendances rejected:', action.payload);
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch attendances';
      });
  },
});

export default attendanceSlice.reducer;
