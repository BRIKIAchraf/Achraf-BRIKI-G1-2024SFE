import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import WorkIcon from '@mui/icons-material/Work';

export const fetchDepartments = createAsyncThunk('departements/fetchDepartments', async () => {
  const response = await axios.get('http://localhost:3001/api/departements');
  return response.data;
});

export const addDepartment = createAsyncThunk('departements/addDepartment', async (department) => {
  const response = await axios.post('http://localhost:3001/api/departements', { name: department.name });
  return {...response.data, icon: department.icon};  // Include icon for UI purposes
});

const departementSlice = createSlice({
  name: 'departements',
  initialState: {
    departments: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addEmployee: (state, action) => {
      const { departmentId, employee } = action.payload;
      const department = state.departments.find(dept => dept.id === departmentId);
      if (department) {
        if (!department.employees) {
          department.employees = [];
        }
        department.employees.push({...employee, id: uuidv4()});
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload.map(dept => ({...dept, icon: <WorkIcon style={{ fontSize: '80px' }}/>})); // Assume default icon for simplicity
        state.status = 'succeeded';
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      });
  }
});

export const { addEmployee } = departementSlice.actions;
export default departementSlice.reducer;
