import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define base URL for the API
const BASE_URL = 'https://schoolomegup-api.onrender.com/api/device';

// Thunks for asynchronous actions

export const fetchDevices = createAsyncThunk('devices/fetchDevices', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error fetching devices');
  }
});

export const scanDeviceByPort = createAsyncThunk('devices/scanDeviceByPort', async (port, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/devices/scan`, null, { params: { port } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error scanning device by port');
  }
});

export const scanDeviceByInet = createAsyncThunk('devices/scanDeviceByInet', async (inet, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/devices/scan`, null, { params: { inet } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error scanning device by inet');
  }
});

export const pingDeviceById = createAsyncThunk('devices/pingDeviceById', async (deviceId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/device/${deviceId}/ping`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error pinging device');
  }
});

export const updateDevice = createAsyncThunk('devices/updateDevice', async ({ deviceId, newName }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${BASE_URL}/device/${deviceId}`, { name: newName });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error updating device');
  }
});

export const removeDevice = createAsyncThunk('devices/removeDevice', async (deviceId, { rejectWithValue }) => {
  try {
    await axios.delete(`${BASE_URL}/device/${deviceId}`);
    return deviceId;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error removing device');
  }
});

// Device slice
const deviceSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: [],
    deviceDetails: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devices = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch devices';
      })
      .addCase(scanDeviceByPort.fulfilled, (state, action) => {
        state.devices.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(scanDeviceByPort.rejected, (state, action) => {
        state.error = action.payload || 'Failed to scan device by port';
      })
      .addCase(scanDeviceByInet.fulfilled, (state, action) => {
        state.devices.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(scanDeviceByInet.rejected, (state, action) => {
        state.error = action.payload || 'Failed to scan device by inet';
      })
      .addCase(pingDeviceById.fulfilled, (state, action) => {
        state.deviceDetails = action.payload;
      })
      .addCase(pingDeviceById.rejected, (state, action) => {
        state.error = action.payload || 'Failed to ping device';
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        const index = state.devices.findIndex(device => device._id === action.payload._id);
        if (index !== -1) {
          state.devices[index] = action.payload;
        }
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update device';
      })
      .addCase(removeDevice.fulfilled, (state, action) => {
        state.devices = state.devices.filter(device => device._id !== action.payload);
      })
      .addCase(removeDevice.rejected, (state, action) => {
        state.error = action.payload || 'Failed to remove device';
      });
  },
});

export default deviceSlice.reducer;
