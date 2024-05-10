import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, MenuItem, Box, Paper } from '@mui/material';
import { fetchDepartments, addDepartment, addEmployee } from '../../store/departementSlice';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import MarketingIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const icons = {
  HR: <BusinessCenterIcon style={{ fontSize: '80px' }} />,
  Financial: <WorkIcon style={{ fontSize: '80px' }} />,
  IT: <ComputerIcon style={{ fontSize: '80px' }} />,
  Marketing: <MarketingIcon style={{ fontSize: '80px' }} />,
  Administration: <AdminPanelSettingsIcon style={{ fontSize: '80px' }} />
};

const DepartmentManagement = () => {
  const dispatch = useDispatch();
  const { departments, status, error } = useSelector(state => state.departements);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDepartments());
    }
  }, [status, dispatch]);

  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeLastName, setNewEmployeeLastName] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleAddDepartment = () => {
    if (newDepartmentName) {
      dispatch(addDepartment({ name: newDepartmentName, icon: icons[newDepartmentName] || <WorkIcon style={{ fontSize: '80px' }} /> }));
      setNewDepartmentName('');
    }
  };

  const handleAddEmployee = () => {
    if (newEmployeeName && newEmployeeLastName && selectedDepartment) {
      dispatch(addEmployee({
        departmentId: selectedDepartment,
        employee: { firstName: newEmployeeName, lastName: newEmployeeLastName }
      }));
      setNewEmployeeName('');
      setNewEmployeeLastName('');
      setSelectedDepartment('');
    }
  };

  const renderDepartments = () => (
    <Box display="flex" flexDirection="row" justifyContent="flex-end" flexWrap="wrap">
      {departments.map((department) => (
        <Box key={department.id} textAlign="center" marginRight="50px" marginBottom="90px">
          {department.icon}
          <Typography variant="h6">{department.name}</Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '10px' }}>
      <Typography variant="h4" gutterBottom>Department Management System</Typography>
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
