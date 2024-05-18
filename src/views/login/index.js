import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginMethods } from '../../store/loginMethodsSlice';
import { Typography, Grid, TextField, MenuItem, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Stack, Pagination } from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LoginMethods = () => {
  const dispatch = useDispatch();
  const { loginMethods, totalCount, status, error } = useSelector(state => state.loginMethods);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLoginMethods());
    }
  }, [status, dispatch]);

  const [selectedMethod, setSelectedMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [unassignedLoginMethods, setUnassignedLoginMethods] = useState([]);
  const [assignedLoginMethods, setAssignedLoginMethods] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState(null);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

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
      setSnackbarMessage('Login method added successfully!');
      setSnackbarOpen(true);
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
    setMethodToDelete({ employee, index });
    setConfirmDialogOpen(true);
  };

  const confirmDeleteMethod = () => {
    const { employee, index } = methodToDelete;
    const updatedMethods = { ...assignedLoginMethods };
    updatedMethods[employee].splice(index, 1);
    setAssignedLoginMethods(updatedMethods);
    setConfirmDialogOpen(false);
    setSnackbarMessage('Login method deleted successfully!');
    setSnackbarOpen(true);
  };

  const openEditDialog = (employee, index) => {
    const methodToEdit = assignedLoginMethods[employee][index];
    setMethodToEdit({ ...methodToEdit, employee, index });
    setEditDialogOpen(true);
  };

  const handleEditInputChange = (e) => {
    setMethodToEdit({ ...methodToEdit, [e.target.name]: e.target.value });
  };

  const saveEditedMethod = () => {
    const { employee, index, ...updatedMethod } = methodToEdit;
    const updatedMethods = { ...assignedLoginMethods };
    updatedMethods[employee][index] = updatedMethod;
    setAssignedLoginMethods(updatedMethods);
    setEditDialogOpen(false);
    setSnackbarMessage('Login method updated successfully!');
    setSnackbarOpen(true);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredUnassignedMethods = unassignedLoginMethods.filter(method =>
    method.code.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredAssignedMethods = Object.keys(assignedLoginMethods)
    .flatMap(employee => assignedLoginMethods[employee].map(method => ({ ...method, employee })))
    .filter(method =>
      method.code.toLowerCase().includes(filter.toLowerCase()) ||
      method.employee.toLowerCase().includes(filter.toLowerCase())
    );

  const paginatedUnassignedMethods = filteredUnassignedMethods.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const paginatedAssignedMethods = filteredAssignedMethods.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Manage Login Methods
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 'bold' }}>
            Add Login Method
          </Typography>
          <TextField
            select
            label="Login Method"
            variant="outlined"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            {loginMethodsOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Code"
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            select
            label="Department (Optional)"
            variant="outlined"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            {departments.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Employee (Optional)"
            variant="outlined"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            {selectedDepartment && employeesByDepartment[selectedDepartment].map((employee) => (
              <MenuItem key={employee} value={employee}>
                {employee}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={addLoginMethod} fullWidth>
            Add Login Method
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 'bold' }}>
            Unassigned Login Methods:
          </Typography>
          <TextField
            label="Filter"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <Grid container spacing={4} justifyContent="center">
            {paginatedUnassignedMethods.map((method, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
                {renderIcon(method.method)}
                <Typography variant="h6" sx={{ color: '#1976d2' }}>{method.method}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>Code: {method.code}</Typography>
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

          <Typography variant="h6" gutterBottom style={{ marginTop: '30px' }} sx={{ color: '#0288d1', fontWeight: 'bold' }}>
            Assigned Login Methods:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {paginatedAssignedMethods.map((method, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
                {renderIcon(method.method)}
                <Typography variant="h6" sx={{ color: '#1976d2' }}>{method.method}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>Code: {method.code}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>Employee: {method.employee}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>Department: {method.department}</Typography>
                <IconButton color="primary" onClick={() => openEditDialog(method.employee, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteLoginMethod(method.employee, index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>

          <Stack spacing={2} style={{ marginTop: '20px' }}>
            <Pagination
              count={Math.ceil((filteredUnassignedMethods.length + filteredAssignedMethods.length) / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this login method?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteMethod} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Login Method</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            variant="outlined"
            name="code"
            value={methodToEdit?.code || ''}
            onChange={handleEditInputChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            select
            label="Login Method"
            variant="outlined"
            name="method"
            value={methodToEdit?.method || ''}
            onChange={handleEditInputChange}
            fullWidth
          >
            {loginMethodsOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveEditedMethod} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

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
    </div>
  );
};

export default LoginMethods;
