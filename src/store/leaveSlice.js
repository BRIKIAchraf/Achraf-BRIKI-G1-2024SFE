import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async (_, { rejectWithValue }) => {
  try {
    console.log("Fetching leaves...");
    const response = await axios.get('http://localhost:3001/api/leave/list');
    console.log("Fetch leaves response:", response.data);
    return response.data.leaves; // Extract the leaves array from the response
  } catch (error) {
    console.log("Error fetching leaves:", error.response ? error.response.data : error);
    return rejectWithValue(error.response ? error.response.data : 'Error fetching leaves');
  }
});

export const revokeLeave = createAsyncThunk('leaves/revokeLeave', async (leaveId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3001/api/leave/revoke/${leaveId}`);
    return leaveId;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error revoking leave');
  }
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    leaves: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        console.log("Fetch leaves fulfilled:", action.payload);
        state.leaves = Array.isArray(action.payload) ? action.payload : [];
        state.status = 'succeeded';
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch leaves';
      })
      .addCase(revokeLeave.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter((leave) => leave._id !== action.payload);
      })
      .addCase(revokeLeave.rejected, (state, action) => {
        state.error = action.payload || 'Failed to revoke leave';
      });
  },
});

export default leaveSlice.reducer;