import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import WorkIcon from '@mui/icons-material/Work';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ComputerIcon from '@mui/icons-material/Computer';
import MarketingIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// Define the icons
const icons = {
  HR: <BusinessCenterIcon style={{ fontSize: '80px' }} />,
  Financial: <WorkIcon style={{ fontSize: '80px' }} />,
  IT: <ComputerIcon style={{ fontSize: '80px' }} />,
  Marketing: <MarketingIcon style={{ fontSize: '80px' }} />,
  Administration: <AdminPanelSettingsIcon style={{ fontSize: '80px' }} />
};

// Thunks
export const fetchDepartments = createAsyncThunk('departements/fetchDepartments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3001/api/departements');
    if (response.data) {
      // Map "_id" to "id" for compatibility with frontend conventions
      return response.data.map(dept => ({
        id: dept._id,
        name: dept.name,
        employees: dept.employees || [],
        icon: icons[dept.name] || <WorkIcon style={{ fontSize: '80px' }} />
      }));
    } else {
      throw new Error('No departments found');
    }
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error fetching departments');
  }
});

export const addDepartment = createAsyncThunk('departements/addDepartment', async (department) => {
  const response = await axios.post('http://localhost:3001/api/departements', { name: department.name });
  return {
    id: response.data._id,
    name: department.name,
    icon: icons[department.name] || <WorkIcon style={{ fontSize: '80px' }} />,
    employees: []
  };
});

export const deleteDepartment = createAsyncThunk('departements/deleteDepartment', async (departmentId) => {
  await axios.delete(`http://localhost:3001/api/departements/${departmentId}`);
  return departmentId;
});

export const assignEmployeeToDepartment = createAsyncThunk('departements/assignEmployeeToDepartment', async ({ departmentId, employeeId }) => {
  await axios.post(`http://localhost:3001/api/departements/assign-employee`, { departmentId, employeeId });
  return { departmentId, employeeId };
});

export const updateDepartment = createAsyncThunk('departements/updateDepartment', async ({ id, name }) => {
  const response = await axios.put(`http://localhost:3001/api/departements/${id}`, { name });
  return {
    id,
    name,
    icon: icons[name] || <WorkIcon style={{ fontSize: '80px' }} /> // Update icon based on the new name
  };
});

// Slice
const departementSlice = createSlice({
  name: 'departements',
  initialState: {
    departments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch departments';
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(department => department.id !== action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        const index = state.departments.findIndex(dept => dept.id === action.payload.id);
        if (index !== -1) {
          state.departments[index] = { ...state.departments[index], ...action.payload };
        }
      })
      .addCase(assignEmployeeToDepartment.fulfilled, (state, action) => {
        const { departmentId, employeeId } = action.payload;
        const department = state.departments.find(dept => dept.id === departmentId);
        if (department && !department.employees.includes(employeeId)) {
          department.employees.push(employeeId);
        }
      });
  }
});

export default departementSlice.reducer;
