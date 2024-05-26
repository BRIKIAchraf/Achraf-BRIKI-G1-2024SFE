import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const fetchDepartments = createAsyncThunk('departements/fetchDepartments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://schoolomegup-api.onrender.com/api/departements');
    if (response.data) {
      return response.data.map(dept => ({
        id: dept._id,
        name: dept.name,
        employees: dept.employees || []
      }));
    } else {
      throw new Error('No departments found');
    }
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : 'Error fetching departments');
  }
});

export const addDepartment = createAsyncThunk('departements/addDepartment', async (department) => {
  const response = await axios.post('https://schoolomegup-api.onrender.com/api/departements', { name: department.name });
  return {
    id: response.data._id,
    name: department.name,
    employees: []
  };
});

export const deleteDepartment = createAsyncThunk('departements/deleteDepartment', async (departmentId) => {
  await axios.delete(`https://schoolomegup-api.onrender.com/api/departements/${departmentId}`);
  return departmentId;
});

export const assignEmployeeToDepartment = createAsyncThunk('departements/assignEmployeeToDepartment', async ({ departmentId, employeeId }) => {
  try {
    console.log('Assigning employee:', { departmentId, employeeId });
    const response = await axios.post('https://schoolomegup-api.onrender.com/api/departements/assign-employee', { departementId: departmentId, employeeId });
    return { departmentId, employeeId };
  } catch (error) {
    console.error('Error in assignEmployeeToDepartment:', error.response.data);
    throw error;
  }
});

export const updateDepartment = createAsyncThunk('departements/updateDepartment', async ({ id, name }) => {
  const response = await axios.put(`https://schoolomegup-api.onrender.com/api/departements/${id}`, { name });
  return {
    id,
    name
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
        const department = state.departments.find(dep => dep.id === departmentId);
        if (department && !department.employees.includes(employeeId)) {
          department.employees.push(employeeId);
        }
      });
  }
});

export default departementSlice.reducer;
