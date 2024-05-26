import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoginMethods } from '../../store/loginMethodsSlice';
import {
  Typography, Grid, TextField, MenuItem, Button, IconButton, Dialog,
  DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Stack, Pagination
} from '@mui/material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [methodToEdit, setMethodToEdit] = useState(null);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const rowsPerPage = 6;

  const loginMethodsOptions = ['Card', 'Fingerprint', 'Password'];
  const departments = ['HR', 'Finance', 'IT'];
  const employeesByDepartment = {
    HR: ['John Doe', 'Jane Smith'],
    Finance: ['Alice Johnson', 'Bob Brown'],
    IT: ['Mark Davis', 'Emily Wilson']
  };

  const addLoginMethod = async () => {
    if (selectedMethod && inputValue) {
      const newLoginMethod = {
        methodType: selectedMethod,
        identifier: selectedMethod !== 'Fingerprint' ? inputValue : undefined,
        fingerprintTemplate: selectedMethod === 'Fingerprint' ? { template: inputValue } : undefined
      };

      try {
        await axios.post('https://schoolomegup-api.onrender.com/api/loginMethods/add', newLoginMethod);
        setSnackbarMessage('Login method added successfully!');
        dispatch(fetchLoginMethods(page, rowsPerPage));
      } catch (error) {
        setSnackbarMessage('Failed to add login method.');
      } finally {
        setSnackbarOpen(true);
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

  const assignLoginMethod = async (loginMethodId, employeeId) => {
    try {
      await axios.post('https://schoolomegup-api.onrender.com/api/loginMethods/assign', { loginMethodId, employeeId });
      setSnackbarMessage('Login method assigned successfully!');
      dispatch(fetchLoginMethods(page, rowsPerPage));
    } catch (error) {
      setSnackbarMessage('Failed to assign login method.');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const deleteLoginMethod = async (id) => {
    setMethodToDelete(id);
    setConfirmDialogOpen(true);
  };
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://schoolomegup-api.onrender.com/api/employes');
      setEmployees(response.data.employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const confirmDeleteMethod = async () => {
    try {
      await axios.delete(`https://schoolomegup-api.onrender.com/api/loginMethods/delete/${methodToDelete}`);
      setSnackbarMessage('Login method deleted successfully!');
      dispatch(fetchLoginMethods(page, rowsPerPage));
    } catch (error) {
      setSnackbarMessage('Failed to delete login method.');
    } finally {
      setConfirmDialogOpen(false);
      setSnackbarOpen(true);
    }
  };

  const openEditDialog = (method) => {
    setMethodToEdit(method);
    setEditDialogOpen(true);
  };

  const handleEditInputChange = (e) => {
    setMethodToEdit({ ...methodToEdit, [e.target.name]: e.target.value });
  };

  const saveEditedMethod = async () => {
    try {
      await axios.put(`/api/loginMethods/update/${methodToEdit._id}`, methodToEdit);
      setSnackbarMessage('Login method updated successfully!');
      dispatch(fetchLoginMethods(page, rowsPerPage));
    } catch (error) {
      setSnackbarMessage('Failed to update login method.');
    } finally {
      setEditDialogOpen(false);
      setSnackbarOpen(true);
    }
  };

  const renderIcon = (methodType) => {
    switch(methodType) {
      case 'Fingerprint':
        return <FingerprintIcon style={{ fontSize: '120px', color: '#3f51b5' }} />;
      case 'Card':
        return <CreditCardIcon style={{ fontSize: '120px', color: '#ff9800' }} />;
      case 'Password':
        return <LockIcon style={{ fontSize: '120px', color: '#4caf50' }} />;
      default:
        return null;
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(fetchLoginMethods(value, rowsPerPage));
  };

  const filteredMethods = loginMethods.filter(method =>
    method.methodType.toLowerCase().includes(filter.toLowerCase()) ||
    (method.assignedTo && (method.assignedTo.nom.toLowerCase().includes(filter.toLowerCase()) || method.assignedTo.prenom.toLowerCase().includes(filter.toLowerCase())))
  );

  const paginatedMethods = filteredMethods.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const assignedMethods = paginatedMethods.filter(method => method.assignedTo);
  const unassignedMethods = paginatedMethods.filter(method => !method.assignedTo);

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Gestion des methodes de pointage
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 'bold' }}>
            Ajouter un methode de pointage
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
          <Button variant="contained" color="primary" onClick={addLoginMethod} fullWidth>
            Ajouter
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 'bold' }}>
            Assigner un methode de pointage:
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
            {assignedMethods.map((method) => (
              <Grid key={method._id} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
                {renderIcon(method.methodType)}
                <Typography variant="h6" sx={{ color: '#1976d2' }}>{method.methodType}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Code: {typeof method.identifier === 'object' ? JSON.stringify(method.identifier) : method.identifier}
                </Typography>
                {method.assignedTo && (
                  <>
                    <Typography variant="body2" sx={{ color: '#616161' }}>Employes: {method.assignedTo.nom} {method.assignedTo.prenom}</Typography>
                    <IconButton color="primary" onClick={() => openEditDialog(method)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteLoginMethod(method._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom sx={{ color: '#0288d1', fontWeight: 'bold', marginTop: '20px' }}>
            Unassigner  methode de pointage:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {unassignedMethods.map((method) => (
              <Grid key={method._id} item xs={12} sm={6} md={4} style={{ textAlign: 'center' }}>
                {renderIcon(method.methodType)}
                <Typography variant="h6" sx={{ color: '#1976d2' }}>{method.methodType}</Typography>
                <Typography variant="body2" sx={{ color: '#616161' }}>
                  Code: {typeof method.identifier === 'object' ? JSON.stringify(method.identifier) : method.identifier}
                </Typography>
                {!method.assignedTo && (
                  <TextField
                    select
                    label="Assign to Employee"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => assignLoginMethod(method._id, e.target.value)}
                  >
                    {employees.map(employee => (
                      <MenuItem key={employee._id} value={employee._id}>
                        {employee.nom} {employee.prenom}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>

          <Stack spacing={2} style={{ marginTop: '20px' }}>
            <Pagination
              count={Math.ceil(filteredMethods.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirmer le supprision</DialogTitle>
        <DialogContent>
          Vous etes sur de supprimer cette methode de pointage?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Sortir</Button>
          <Button onClick={confirmDeleteMethod} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Modifier un methode de pointage</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            variant="outlined"
            name="identifier"
            value={methodToEdit?.identifier || ''}
            onChange={handleEditInputChange}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
          <TextField
            select
            label="Methode de pointage"
            variant="outlined"
            name="methodType"
            value={methodToEdit?.methodType || ''}
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
          <Button onClick={saveEditedMethod} color="primary">Enregistrer</Button>
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
