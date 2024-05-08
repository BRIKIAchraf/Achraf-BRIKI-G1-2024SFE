import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all plannings
export const fetchPlannings = createAsyncThunk(
  'planning/fetchPlannings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/api/plannings');
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch planning by ID
export const fetchPlanningById = createAsyncThunk(
  'planning/fetchPlanningById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/plannings/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update planning
export const updatePlanning = createAsyncThunk(
  'planning/updatePlanning',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/plannings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete planning
export const deletePlanning = createAsyncThunk(
  'planning/deletePlanning',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/plannings/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return id; // Return id to remove it from the state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const planningSlice = createSlice({
  name: 'planning',
  initialState: {
    plannings: [],
    currentPlanning: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannings.fulfilled, (state, action) => {
        state.plannings = action.payload;
      })
      .addCase(fetchPlanningById.fulfilled, (state, action) => {
        state.currentPlanning = action.payload;
      })
      .addCase(updatePlanning.fulfilled, (state, action) => {
        const index = state.plannings.findIndex(planning => planning.id === action.payload.id);
        state.plannings[index] = action.payload;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.plannings = state.plannings.filter(planning => planning.id !== action.payload);
      });
  }
});

export default planningSlice.reducer;
