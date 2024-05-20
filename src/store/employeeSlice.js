import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(`${BASE_URL}/employes`);
 // return response.data;
  return response.data.employees; 
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
  const response = await axios.get(`${BASE_URL}/employes/${id}`);
  return response.data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employee) => {
  const response = await axios.post(`${BASE_URL}/employes`, employee);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, employee }) => {
  const response = await axios.put(`${BASE_URL}/employes/${id}`, employee);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`${BASE_URL}/employes/${id}`);
  return id;
});

export const fetchPlannings = createAsyncThunk('employee/fetchPlannings', async () => {
  const response = await axios.get(`${BASE_URL}/plannings`);
  return response.data;
});

export const fetchDepartments = createAsyncThunk('employee/fetchDepartments', async () => {
  const response = await axios.get(`${BASE_URL}/departments`);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    employee: null,
    plannings: [],
    departments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.employee = action.payload; // Ensure the updated employee is set
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee._id !== action.payload);
      })
      .addCase(fetchPlannings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlannings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.plannings = action.payload;
      })
      .addCase(fetchPlannings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
