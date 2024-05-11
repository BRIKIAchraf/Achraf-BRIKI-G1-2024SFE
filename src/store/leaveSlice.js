// src/store/leaveSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3001/api/leave';

export const fetchLeaves = createAsyncThunk('leave/fetchLeaves', async () => {
  const response = await axios.get(`${baseURL}/list`);
  return response.data;
});

export const assignLeave = createAsyncThunk('leave/assignLeave', async (leaveData) => {
  const response = await axios.post(`${baseURL}/assign`, leaveData);
  return response.data;
});

export const modifyLeave = createAsyncThunk('leave/modifyLeave', async ({ leaveId, leaveData }) => {
  const response = await axios.put(`${baseURL}/modify/${leaveId}`, leaveData);
  return response.data;
});

export const revokeLeave = createAsyncThunk('leave/revokeLeave', async (leaveId) => {
  await axios.delete(`${baseURL}/revoke/${leaveId}`);
  return leaveId;
});

const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    leaves: [],
    status: 'idle',
    error: null,
    totalCount: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload.leaves;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(assignLeave.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      .addCase(modifyLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex(leave => leave._id === action.payload._id);
        if (index !== -1) {
          state.leaves[index] = action.payload;
        }
      })
      .addCase(revokeLeave.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter(leave => leave._id !== action.payload);
      });
  }
});

export default leaveSlice.reducer;
