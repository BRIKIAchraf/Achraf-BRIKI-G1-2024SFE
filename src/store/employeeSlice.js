import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

// Thunks for fetching data from the API
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(`${BASE_URL}/employes`);
  return response.data;
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

export const fetchPlannings = createAsyncThunk('employees/fetchPlannings', async () => {
  const response = await axios.get(`${BASE_URL}/plannings`);
  return response.data;
});

export const fetchDepartments = createAsyncThunk('employees/fetchDepartments', async () => {
  const response = await axios.get(`${BASE_URL}/departements`);
  return response.data;
});

export const fetchLoginMethods = createAsyncThunk('employees/fetchLoginMethods', async () => {
  const response = await axios.get(`${BASE_URL}/loginMethods`);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    employee: null,
    plannings: [],
    departments: [],
    loginMethods: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Employees
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
      // Employee by ID
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
      // Create Employee
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      // Update Employee
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      // Delete Employee
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee._id !== action.payload);
      })
      // Fetch Plannings
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
      // Fetch Departments
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
      })
      // Fetch Login Methods
      .addCase(fetchLoginMethods.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoginMethods.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loginMethods = action.payload;
      })
      .addCase(fetchLoginMethods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
