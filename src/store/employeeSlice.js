// src/features/employees/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/employes';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get(BASE_URL);
  console.log("fetchEmployees response:", response.data);
  return response.data;
});

export const fetchEmployeeById = createAsyncThunk('employees/fetchEmployeeById', async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  console.log("fetchEmployeeById response:", response.data);
  return response.data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employee) => {
  const response = await axios.post(BASE_URL, employee);
  console.log("createEmployee response:", response.data);
  return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, employee }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, employee);
  console.log("updateEmployee response:", response.data);
  return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  console.log("deleteEmployee id:", id);
  return id;
});

export const modifyEmployee = createAsyncThunk('employees/modifyEmployee', async ({ id, updatedEmployee }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedEmployee);
  console.log("modifyEmployee response:", response.data);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    employee: null,
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
        console.log("State after fetchEmployees:", state);
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error("fetchEmployees error:", action.error.message);
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
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee._id !== action.payload);
      })
      .addCase(modifyEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      });
  },
});

export default employeeSlice.reducer;
