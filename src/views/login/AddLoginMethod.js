import React, { useState } from 'react';
import { Typography, Grid, TextField, MenuItem, Button } from '@mui/material';

const AddLoginMethod = ({ onAddLoginMethod }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const loginMethodsOptions = ['Fingerprint', 'Credit Card', 'Password'];
  const departments = ['HR', 'Finance', 'IT'];
  const employeesByDepartment = {
    HR: ['John Doe', 'Jane Smith'],
    Finance: ['Alice Johnson', 'Bob Brown'],
    IT: ['Mark Davis', 'Emily Wilson']
  };

  const addLoginMethod = () => {
    if (selectedMethod && inputValue && onAddLoginMethod) {
      onAddLoginMethod(selectedMethod, inputValue, selectedDepartment, selectedEmployee);
      setSelectedMethod('');
      setInputValue('');
      setSelectedDepartment('');
      setSelectedEmployee('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Add Login Method
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <TextField
            select
            label="Login Method"
            variant="outlined"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            fullWidth
          >
            {loginMethodsOptions.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <TextField
            label="Code"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <TextField
            select
            label="Department (Optional)"
            variant="outlined"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            fullWidth
          >
            {departments.map((department) => (
              <MenuItem key={department} value={department}>{department}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <TextField
            select
            label="Employee (Optional)"
            variant="outlined"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            fullWidth
          >
            {selectedDepartment && employeesByDepartment[selectedDepartment].map((employee) => (
              <MenuItem key={employee} value={employee}>{employee}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button onClick={addLoginMethod} variant="contained" color="primary">Add Login Method</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddLoginMethod;
