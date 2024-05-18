import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlannings = createAsyncThunk('planning/fetchPlannings', async () => {
  const response = await axios.get('http://localhost:3001/api/plannings');
  return response.data;
});

export const deletePlanning = createAsyncThunk('planning/deletePlanning', async (id) => {
  await axios.delete(`http://localhost:3001/api/plannings${id}`);
  return id;
});

export const addPlanning = createAsyncThunk('planning/addPlanning', async (planning) => {
  const response = await axios.post('http://localhost:3001/api/plannings', planning);
  return response.data;
});

const planningSlice = createSlice({
  name: 'planning',
  initialState: {
    plannings: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlannings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plannings = action.payload;
      })
      .addCase(fetchPlannings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.plannings = state.plannings.filter(planning => planning._id !== action.payload);
      })
      .addCase(addPlanning.fulfilled, (state, action) => {
        state.plannings.push(action.payload);
      });
  }
});

export default planningSlice.reducer;
