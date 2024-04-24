import React, { useState } from 'react';
import { Typography, Grid, TextField, MenuItem, Button, IconButton } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

const LoginMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [unassignedLoginMethods, setUnassignedLoginMethods] = useState([]);
  const [assignedLoginMethods, setAssignedLoginMethods] = useState({});

  const loginMethodsOptions = ['Fingerprint', 'Credit Card', 'Password'];
  const departments = ['HR', 'Finance', 'IT'];
  const employeesByDepartment = {
    HR: ['John Doe', 'Jane Smith'],
    Finance: ['Alice Johnson', 'Bob Brown'],
    IT: ['Mark Davis', 'Emily Wilson']
  };

  const addLoginMethod = () => {
    if (selectedMethod && inputValue) {
      const methodDetails = {
        method: selectedMethod,
        code: inputValue,
        department: selectedDepartment,
        employee: selectedEmployee
      };

      if (selectedEmployee) {
        const updatedMethods = { ...assignedLoginMethods };
        const methods = updatedMethods[selectedEmployee] || [];
        methods.push(methodDetails);
        updatedMethods[selectedEmployee] = methods;
        setAssignedLoginMethods(updatedMethods);
      } else {
        setUnassignedLoginMethods([...unassignedLoginMethods, methodDetails]);
      }

      // Reset fields
      setSelectedMethod('');
      setInputValue('');
      setSelectedDepartment('');
      setSelectedEmployee('');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const assignLoginMethod = (index, employee, department) => {
    const methodToAssign = unassignedLoginMethods[index];
    const updatedUnassigned = [...unassignedLoginMethods];
    updatedUnassigned.splice(index, 1);
    setUnassignedLoginMethods(updatedUnassigned);

    methodToAssign.employee = employee;
    methodToAssign.department = department;

    const updatedMethods = { ...assignedLoginMethods };
    const methods = updatedMethods[employee] || [];
    methods.push(methodToAssign);
    updatedMethods[employee] = methods;
    setAssignedLoginMethods(updatedMethods);
  };

  const deleteLoginMethod = (employee, index) => {
    const updatedMethods = { ...assignedLoginMethods };
    updatedMethods[employee].splice(index, 1);
    setAssignedLoginMethods(updatedMethods);
  };

  const renderIcon = (methodType) => {
    switch(methodType) {
      case 'Fingerprint':
        return <FingerprintIcon style={{ fontSize: '120px', color: '#3f51b5' }} />;
      case 'Credit Card':
        return <CreditCardIcon style={{ fontSize: '120px', color: '#ff9800' }} />;
      case 'Password':
        return <LockIcon style={{ fontSize: '120px', color: '#4caf50' }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Manage Login Methods
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
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
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
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
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
              <MenuItem key={employee} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button onClick={addLoginMethod}>Add Login Method</Button>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>
        Unassigned Login Methods:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {unassignedLoginMethods.map((method, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
            {renderIcon(method.method)}
            <Typography variant="h6">{method.method}</Typography>
            <Typography variant="body2">Code: {method.code}</Typography>
            <TextField
              select
              label="Assign to Employee"
              variant="outlined"
              fullWidth
              onChange={(e) => assignLoginMethod(index, e.target.value, method.department)}
            >
              {Object.keys(employeesByDepartment).flatMap(department =>
                employeesByDepartment[department].map(employee => (
                  <MenuItem key={employee} value={employee}>
                    {employee}
                  </MenuItem>
                ))
              )}
            </TextField>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: '30px' }}>
        Assigned Login Methods:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {Object.keys(assignedLoginMethods).map((employee) =>
          assignedLoginMethods[employee].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
              {renderIcon(item.method)}
              <Typography variant="h6">{item.method}</Typography>
              <Typography variant="body2">Code: {item.code}</Typography>
              <Typography variant="body2">Employee: {item.employee}</Typography>
              <Typography variant="body2">Department: {item.department}</Typography>
              <IconButton onClick={() => deleteLoginMethod(employee, index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default LoginMethods;
