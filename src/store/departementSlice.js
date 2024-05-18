import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDepartments = createAsyncThunk('departements/fetchDepartments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3001/api/departements');
    return response.data.map(dept => ({
      id: dept._id,
      name: dept.name,
      employees: dept.employees || []
    }));
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const addDepartment = createAsyncThunk('departements/addDepartment', async (department, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/departements', department);
    return { id: response.data._id, name: department.name, employees: [] };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const deleteDepartment = createAsyncThunk('departements/deleteDepartment', async (departmentId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:3001/api/departements/${departmentId}`);
    return departmentId;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const updateDepartment = createAsyncThunk('departements/updateDepartment', async (department, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/departements/${department.id}`, department);
    return { id: department.id, name: department.name };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

export const assignEmployeeToDepartment = createAsyncThunk(
  'departements/assignEmployeeToDepartment',
  async ({ departmentId, employeeId }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/departements/assign-employee', {
        departmentId,
        employeeId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Error assigning employee to department');
    }
  }
);

const departementSlice = createSlice({
  name: 'departements',
  initialState: {
    departments: [],
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
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
      })
      .addCase(assignEmployeeToDepartment.rejected, (state, action) => {
        // Handle rejection, you can set an error message or update the state appropriately
        state.error = action.error.message || 'Failed to assign employee';
      });
  }
  
});

export default departementSlice.reducer;
