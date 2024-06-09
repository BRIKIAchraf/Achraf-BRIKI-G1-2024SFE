import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLoginMethods = createAsyncThunk(
  'loginMethods/fetchLoginMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://schoolomegup-api.onrender.com/api/loginMethods/list');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLoginMethod = createAsyncThunk('loginMethods/deleteLoginMethod', async (id, { rejectWithValue }) => {
  try {
    await axios.put(`https://schoolomegup-api.onrender.com/api/loginMethods/delete/${id}`); // Update to PUT for soft delete
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
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
      })
      .addCase(fetchLoginMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteLoginMethod.fulfilled, (state, action) => {
        state.loginMethods = state.loginMethods.filter(method => method._id !== action.payload);
      });
  }
});

export default loginMethodsSlice.reducer;
