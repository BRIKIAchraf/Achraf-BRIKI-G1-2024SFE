import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoginMethods = createAsyncThunk(
  'loginMethods/fetchLoginMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://schoolomegup-api.onrender.com/api/loginMethods/list');
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching login methods:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const loginMethodsSlice = createSlice({
  name: 'loginMethods',
  initialState: {
    loginMethods: [],
    totalCount: 0,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoginMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loginMethods = action.payload.loginMethods; // Accessing the array correctly
        state.totalCount = action.payload.totalCount; // Accessing the total count correctly
        console.log("Login Methods:", state.loginMethods);
      })
      .addCase(fetchLoginMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default loginMethodsSlice.reducer;
