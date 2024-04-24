import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, MenuItem, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
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
  const [employees, setEmployees] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleAddDepartment = () => {
    if (newDepartmentName) {
      setDepartments([...departments, { id: uuidv4(), name: newDepartmentName, icon: <WorkIcon style={{ fontSize: '80px' }} /> }]);
      setNewDepartmentName('');
    }
  };

  const handleAddEmployee = () => {
    if (newEmployeeName && selectedDepartment) {
      setEmployees([...employees, { id: uuidv4(), name: newEmployeeName, departmentId: selectedDepartment, avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` }]);
      setNewEmployeeName('');
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployees(employees.filter(employee => employee.id !== employeeId));
  };

  const handleChangeEmployeeDepartment = (employeeId, newDepartmentId) => {
    setEmployees(employees.map(employee => {
      if (employee.id === employeeId) {
        return { ...employee, departmentId: newDepartmentId };
      }
      return employee;
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Department Management System
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          {departments.map((dept) => (
            <Paper key={dept.id} style={{ margin: '10px', padding: '10px', textAlign: 'center' }}>
              {dept.icon}
              <Typography variant="h6">{dept.name}</Typography>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="New Employee Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Assign Department"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            fullWidth
            style={{ marginTop: '10px' }}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.id}>
                {department.name}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleAddEmployee} style={{ marginTop: '10px' }}>Add Employee</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="New Department Name"
            value={newDepartmentName}
            onChange={(e) => setNewDepartmentName(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddDepartment} style={{ marginTop: '10px' }}>Add Department</Button>
        </Grid>
        {departments.map((department) => (
          <Grid item xs={12} sm={4} key={department.id}>
            <Typography variant="h6" align="center">{department.name}</Typography>
            <List>
              {employees.filter(emp => emp.departmentId === department.id).map((employee) => (
                <ListItem key={employee.id} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEmployee(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemAvatar>
                    <Avatar src={employee.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={employee.name} />
                  <TextField
                    select
                    label="Change Department"
                    value={employee.departmentId}
                    onChange={(e) => handleChangeEmployeeDepartment(employee.id, e.target.value)}
                    style={{ width: '200px' }}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DepartmentManagement;
