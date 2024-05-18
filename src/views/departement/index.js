import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, TextField, Button, MenuItem, Box, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Container, Grid, Snackbar, Alert, Stack, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fetchDepartments, addDepartment, deleteDepartment, updateDepartment, assignEmployeeToDepartment } from '../../store/departementSlice';
import { fetchEmployees } from '../../store/employeeSlice';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import MarketingIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const getIcon = (name) => {
  switch (name) {
    case 'HR':
      return <BusinessCenterIcon style={{ fontSize: '80px', color: '#1976d2' }} />;
    case 'Financial':
      return <WorkIcon style={{ fontSize: '80px', color: '#388e3c' }} />;
    case 'IT':
      return <ComputerIcon style={{ fontSize: '80px', color: '#0288d1' }} />;
    case 'Marketing':
      return <MarketingIcon style={{ fontSize: '80px', color: '#f57c00' }} />;
    case 'Administration':
      return <AdminPanelSettingsIcon style={{ fontSize: '80px', color: '#d32f2f' }} />;
    default:
      return <WorkIcon style={{ fontSize: '80px' }} />;
  }
};

const DepartmentManagement = () => {
  const dispatch = useDispatch();
  const { departments, status: departmentStatus, error } = useSelector(state => state.departements);
  const employees = useSelector(state => state.employees?.employees || []); // Ensure employees is always an array

  useEffect(() => {
    if (departmentStatus === 'idle') {
      dispatch(fetchDepartments());
    }
    dispatch(fetchEmployees());
  }, [departmentStatus, dispatch]);

  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editableDepartment, setEditableDepartment] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterEmployee, setFilterEmployee] = useState('');

  // Pagination state
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleAddDepartment = async () => {
    if (newDepartmentName) {
      try {
        await dispatch(addDepartment({ name: newDepartmentName })).unwrap();
        setNewDepartmentName('');
        console.log('Added department:', newDepartmentName);
      } catch (error) {
        console.error('Error adding department:', error);
      }
    }
  };

  const handleAssignEmployee = async () => {
    if (selectedEmployee && selectedDepartment) {
      try {
        await dispatch(assignEmployeeToDepartment({ departmentId: selectedDepartment, employeeId: selectedEmployee })).unwrap();
        setSelectedEmployee('');
        setSelectedDepartment('');
        setSnackbarMessage('Employee assigned successfully!');
        setSnackbarOpen(true);
        console.log('Assigned employee:', selectedEmployee, 'to department:', selectedDepartment);
      } catch (error) {
        console.error('Error assigning employee:', error);
      }
    }
  };

  const handleDeleteDepartment = async (departmentId) => {
    if (departmentId) {
      try {
        await dispatch(deleteDepartment(departmentId)).unwrap();
        setSnackbarMessage('Department deleted successfully!');
        setSnackbarOpen(true);
        console.log('Deleted department:', departmentId);
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    }
  };

  const handleUpdateDepartment = async () => {
    if (editableDepartment) {
      try {
        await dispatch(updateDepartment({ id: editableDepartment.id, name: editableDepartment.name })).unwrap();
        setEditDialogOpen(false);
        setEditableDepartment(null);
        setSnackbarMessage('Department updated successfully!');
        setSnackbarOpen(true);
        console.log('Updated department:', editableDepartment);
      } catch (error) {
        console.error('Error updating department:', error);
      }
    }
  };

  const openEditDialog = (department) => {
    setEditableDepartment(department);
    setEditDialogOpen(true);
    console.log('Editing department:', department);
  };

  const handleNameChange = (event) => {
    if (editableDepartment) {
      setEditableDepartment({ ...editableDepartment, name: event.target.value });
      console.log('Changed name to:', event.target.value);
    }
  };

  const handleRemoveEmployee = (employeeId) => {
    setEmployeeToRemove(employeeId);
    setConfirmDialogOpen(true);
    console.log('Set to remove employee:', employeeId);
  };

  const confirmRemoveEmployee = async () => {
    if (editableDepartment && employeeToRemove) {
      try {
        const updatedEmployees = editableDepartment.employees.filter(emp => emp !== employeeToRemove);
        await dispatch(updateDepartment({ id: editableDepartment.id, name: editableDepartment.name, employees: updatedEmployees })).unwrap();
        setConfirmDialogOpen(false);
        setEmployeeToRemove(null);
        setSnackbarMessage('Employee removed successfully!');
        setSnackbarOpen(true);
        console.log('Removed employee:', employeeToRemove, 'from department:', editableDepartment.id);
      } catch (error) {
        console.error('Error removing employee:', error);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    console.log('Changed page to:', value);
  };

  const filteredDepartments = departments.filter(department => department.name.toLowerCase().includes(filterDepartment.toLowerCase()));
  const paginatedDepartments = filteredDepartments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const renderDepartments = () => (
    <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="wrap" gap={4}>
      {paginatedDepartments.map((department) => (
        <Paper key={department.id} style={{ padding: '20px', width: '220px', textAlign: 'center', position: 'relative' }}>
          {getIcon(department.name)}
          <Typography variant="h6" style={{ marginTop: '10px' }}>{department.name}</Typography>
          <Typography variant="body2">{`Employees: ${department.employees.length}`}</Typography>
          <Box style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <IconButton onClick={() => openEditDialog(department)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteDepartment(department.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
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
        {editableDepartment && Array.isArray(editableDepartment.employees) && editableDepartment.employees.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Employees</Typography>
            {editableDepartment.employees.map(employee => (
              <Box key={employee} display="flex" alignItems="center" justifyContent="space-between">
                <Typography>{employees.find(emp => emp._id === employee)?.nom} {employees.find(emp => emp._id === employee)?.prenom}</Typography>
                <IconButton color="error" onClick={() => handleRemoveEmployee(employee)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleUpdateDepartment}>Update</Button>
      </DialogActions>
    </Dialog>
  );

  const renderConfirmDialog = () => (
    <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
      <DialogTitle>Confirm Removal</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to remove this employee?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
        <Button onClick={confirmRemoveEmployee} color="error">Remove</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container style={{ padding: '20px', maxWidth: '1200px' }}>
      <Typography variant="h4" gutterBottom>
        Department Management System
      </Typography>
      {renderEditDialog()}
      {renderConfirmDialog()}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
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
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>Assign Employees</Typography>
            <TextField
              select
              label="Select Employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              fullWidth
              margin="normal"
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.nom + " " + employee.prenom}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Filter Employees"
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
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
            <Button variant="contained" color="primary" onClick={handleAssignEmployee} style={{ marginTop: '10px' }}>
              Assign Employee
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Filter Departments"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginBottom: '20px' }}
          />
          {renderDepartments()}
          <Stack spacing={2} style={{ marginTop: '20px' }}>
            <Pagination
              count={Math.ceil(filteredDepartments.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DepartmentManagement;
