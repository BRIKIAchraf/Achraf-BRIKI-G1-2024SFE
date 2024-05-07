import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all employees
export const fetchAllEmployees = createAsyncThunk(
  'employees/fetchAll',
  async () => {
    const response = await axios.get('http://localhost:3001/api/employes');
    return response.data;
  }
);

// Fetch employee by ID
export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchById',
  async (id) => {
    const response = await fetch(`/api/employes/${id}`);
    return response.json();
  }
);

// Create an employee
export const createEmployee = createAsyncThunk(
  'employees/create',
  async (employeeData) => {
    const response = await fetch('/api/employes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData)
    });
    return response.json();
  }
);

// Modify an employee
export const modifyEmployee = createAsyncThunk(
  'employees/modify',
  async ({ id, employeeData }) => {
    const response = await fetch(`/api/employes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData)
    });
    return response.json();
  }
);

// Delete an employee
export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id) => {
    await fetch(`/api/employes/${id}`, {
      method: 'DELETE'
    });
    return id;
  }
);

// Generate employee report
export const generateEmployeeReport = createAsyncThunk(
  'employees/generateReport',
  async (id) => {
    const response = await fetch(`/api/employes/${id}/generate-report`);
    return response.json();
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        // This assumes you want to add or replace the fetched employee in the state
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        } else {
          state.employees.push(action.payload);
        }
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload); // Add new employee to state
      })
      .addCase(modifyEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      })
      .addCase(generateEmployeeReport.fulfilled, (state, action) => {
        // How to handle the report data can be customized based on your needs
      });
  }
});

export default employeeSlice.reducer;
