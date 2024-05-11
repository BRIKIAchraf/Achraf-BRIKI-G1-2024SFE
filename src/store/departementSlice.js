import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import WorkIcon from '@mui/icons-material/Work';

// Thunks
export const fetchDepartments = createAsyncThunk('departements/fetchDepartments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3001/api/departements');
    if (response.data) {
      // Map "_id" to "id" for compatibility with frontend conventions
      return response.data.map(dept => ({
        id: dept._id,
        name: dept.name,
        employees: dept.employees
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
  return {id: response.data._id, icon: <WorkIcon style={{ fontSize: '80px' }} />};
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
  return { id, name, iconType: 'default' };  // Assuming your API response is limited to the updated data
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
        state.departments = action.payload.map(dept => ({...dept, icon: <WorkIcon style={{ fontSize: '80px' }}/>}));
        state.status = 'succeeded';
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
