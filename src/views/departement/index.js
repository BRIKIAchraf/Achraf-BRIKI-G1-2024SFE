import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, MenuItem, Box, Paper, IconButton,Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDepartments, addDepartment, deleteDepartment, updateDepartment } from '../../store/departementSlice';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import MarketingIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EditIcon from '@mui/icons-material/Edit';
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editableDepartment, setEditableDepartment] = useState(null);
  const handleAddDepartment = () => {
    if (newDepartmentName) {
      dispatch(addDepartment({ name: newDepartmentName, icon: icons[newDepartmentName] || <WorkIcon style={{ fontSize: '80px' }} /> }));
      setNewDepartmentName('');
    }
  };

  //const handleAddEmployee = () => {
    //if (newEmployeeName && newEmployeeLastName && selectedDepartment) {
      //dispatch(addEmployee({
       // departmentId: selectedDepartment,
        //employee: { firstName: newEmployeeName, lastName: newEmployeeLastName }
      //}));
      //setNewEmployeeName('');
      //setNewEmployeeLastName('');
      //setSelectedDepartment('');
    //}
  //};

  const handleDeleteDepartment = (departmentId) => {
    if (departmentId) {
      dispatch(deleteDepartment(departmentId));
    } else {
      console.error("No department ID provided for deletion.");
    }
  };

  const handleUpdateDepartment = () => {
    if (editableDepartment) {
      dispatch(updateDepartment({ id: editableDepartment.id, name: editableDepartment.name }));
      setEditDialogOpen(false);
      setEditableDepartment(null);
    }
  };
  const openEditDialog = (department) => {
    setEditableDepartment(department);
    setEditDialogOpen(true);
  };

  const handleNameChange = (event) => {
    if (editableDepartment) {
      setEditableDepartment({ ...editableDepartment, name: event.target.value });
    }
  };

  const renderDepartments = () => (
    <Box display="flex" flexDirection="row" justifyContent="flex-end" flexWrap="wrap">
      {departments.map((department) => (
        <Box key={department.id} textAlign="center" marginRight="50px" marginBottom="90px">
          {department.icon}
          <Typography variant="h6">{department.name}</Typography>
          <IconButton onClick={() => handleDeleteDepartment(department.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
  const renderEditDialog = () => (
    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Department Name"
          type="text"
          fullWidth
          variant="standard"
          value={editableDepartment ? editableDepartment.name : ''}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleUpdateDepartment}>Update</Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '10px' }}>
      <Typography variant="h4" gutterBottom>
        Department Management System
      </Typography>
      {renderEditDialog()}
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
            <Button variant="contained" color="primary"  style={{ marginTop: '10px' }}>
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
