import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchLeaves = createAsyncThunk('leaves/fetchLeaves', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://schoolomegup-api.onrender.com/api/leave/list');
    return response.data.leaves;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error fetching leaves');
  }
});

export const fetchLeaveById = createAsyncThunk('leaves/fetchLeaveById', async (leaveId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://schoolomegup-api.onrender.com/api/leave/${leaveId}`);
    const leave = response.data.leave;

    // Fetch employee details for each employee ID
    const employeeDetails = await Promise.all(
      leave.employees.map(async (employee) => {
        const employeeId = typeof employee === 'object' ? employee._id : employee;
        const employeeResponse = await axios.get(`https://schoolomegup-api.onrender.com/api/employes/${employeeId}`);
        return employeeResponse.data;
      })
    );

    // Combine leave and employee details
    leave.employees = employeeDetails;

    return leave;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error fetching leave details');
  }
});

export const revokeLeave = createAsyncThunk('leaves/revokeLeave', async (leaveId, { rejectWithValue }) => {
  try {
    await axios.delete(`https://schoolomegup-api.onrender.com/api/leave/revoke/${leaveId}`);
    return leaveId;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error revoking leave');
  }
});

const leaveSlice = createSlice({
  name: 'leaves',
  initialState: {
    leaves: [],
    leaveDetails: null,
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
        state.leaves = Array.isArray(action.payload) ? action.payload : [];
        state.status = 'succeeded';
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch leaves';
      })
      .addCase(fetchLeaveById.fulfilled, (state, action) => {
        state.leaveDetails = action.payload;
      })
      .addCase(fetchLeaveById.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch leave details';
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
