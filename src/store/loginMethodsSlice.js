import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoginMethods = createAsyncThunk('loginMethods/fetchLoginMethods', async () => {
  const response = await axios.get('http://localhost:3001/api/loginMethods/list');
  console.log('API Response:', response.data);  // Added console log to check the API response
  return response.data;
});

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
        state.loginMethods = action.payload.loginMethods;
        state.totalCount = action.payload.totalCount;
        console.log('Login Methods:', state.loginMethods);  // Added console log to check the login methods in state
      })
      .addCase(fetchLoginMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default loginMethodsSlice.reducer;
