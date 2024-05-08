import React, { useState } from 'react';
import { Typography, TextField, Button, MenuItem, Box, Paper } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import MarketingIcon from '@mui/icons-material/Assessment'; // Placeholder for marketing
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DepartmentManagement = () => {
  const initialDepartments = [
    { id: uuidv4(), name: 'HR', icon: <BusinessCenterIcon style={{ fontSize: '80px' }} /> },
    { id: uuidv4(), name: 'Financial', icon: <WorkIcon style={{ fontSize: '80px' }} /> },
    { id: uuidv4(), name: 'IT', icon: <ComputerIcon style={{ fontSize: '80px' }} /> },
    { id: uuidv4(), name: 'Marketing', icon: <MarketingIcon style={{ fontSize: '80px' }} /> },
    { id: uuidv4(), name: 'Administration', icon: <AdminPanelSettingsIcon style={{ fontSize: '80px' }} /> }
  ];

  const [departments, setDepartments] = useState(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeLastName, setNewEmployeeLastName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [assignedEmployee, setAssignedEmployee] = useState(null);

  const handleAddDepartment = () => {
    if (newDepartmentName) {
      setDepartments([...departments, { id: uuidv4(), name: newDepartmentName, icon: <WorkIcon style={{ fontSize: '80px' }} /> }]);
      setNewDepartmentName('');
    }
  };

  const handleAddEmployee = () => {
    if (newEmployeeName && newEmployeeLastName && selectedDepartment) {
      const updatedDepartments = departments.map(department => {
        if (department.id === selectedDepartment) {
          return {
            ...department,
            employees: [...department.employees, { id: uuidv4(), firstName: newEmployeeName, lastName: newEmployeeLastName }]
          };
        }
        return department;
      });

      setDepartments(updatedDepartments);
      setNewEmployeeName('');
      setNewEmployeeLastName('');
      setSelectedDepartment('');
      setAssignedEmployee(null);
    }
  };

  const handleEmployeeSelection = (event) => {
    setAssignedEmployee(event.target.value);
  };

  const renderDepartments = () => {
    return (
      <Box display="flex" flexDirection="row" justifyContent="flex-end" flexWrap="wrap">
        {departments.map((department) => (
          <Box key={department.id} textAlign="center" marginRight="50px" marginBottom="90px">
            {department.icon}
            <Typography variant="h6">{department.name}</Typography>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Department Management System
      </Typography>
      <Box display="flex">
        <Box style={{ marginRight: '90px' }}>
          <Paper style={{ padding: '20px', width: '300px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>Manage Departments</Typography>
            <TextField
              label="New Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddDepartment} style={{ marginTop: '10px' }}>
              Add Department
            </Button>
          </Paper>
          <Paper style={{ padding: '20px', width: '300px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>Assign Employees</Typography>
            <TextField
              label="New Employee First Name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="New Employee Last Name"
              value={newEmployeeLastName}
              onChange={(e) => setNewEmployeeLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Assign Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              fullWidth
              margin="normal"
            >
              {departments.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleAddEmployee} style={{ marginTop: '10px' }}>
              Add Employee
            </Button>
          </Paper>
        </Box>
        {renderDepartments()}
      </Box>
    </div>
  );
};

export default DepartmentManagement;
