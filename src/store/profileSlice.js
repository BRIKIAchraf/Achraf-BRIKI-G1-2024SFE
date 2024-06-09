import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to update the profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://schoolomegup-api.onrender.com/api/company', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update Profile Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Update Profile Error:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to fetch the profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://schoolomegup-api.onrender.com/api/company');
      console.log('Fetch Profile Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch Profile Error:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
    address: '',
    additionalInfo: '',
    logo: null,
    logoUrl: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setAdditionalInfo: (state, action) => {
      state.additionalInfo = action.payload;
    },
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state with the response data if needed
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update profile';
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.additionalInfo = action.payload.additionalInfo;
        state.logoUrl = `https://schoolomegup-api.onrender.com/uploads/${action.payload.logo}`; // Assuming logo is a file name and stored in the uploads directory
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch profile';
      });
  },
});

export const { setName, setAddress, setAdditionalInfo, setLogo } = profileSlice.actions;
export default profileSlice.reducer;
