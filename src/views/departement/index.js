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
  const { departments, status, error } = useSelector(state => state.departements);
  const { employees, status: employeeStatus } = useSelector(state => state.employees);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDepartments());
    }
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, employeeStatus, dispatch]);

  useEffect(() => {
    console.log("Departments:", departments);
  }, [departments]);

  useEffect(() => {
    console.log("Employees:", employees);
  }, [employees]);

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

  const handleAddDepartment = () => {
    if (newDepartmentName) {
      dispatch(addDepartment({ name: newDepartmentName }));
      setNewDepartmentName('');
    }
  };

  const handleAssignEmployee = async () => {
    if (selectedEmployee && selectedDepartment) {
      console.log("Selected Department:", selectedDepartment);
      console.log("Selected Employee:", selectedEmployee);
      try {
        // Send selected employeeId and departmentId
        await dispatch(assignEmployeeToDepartment({ departmentId: selectedDepartment, employeeId: selectedEmployee }));
        setSelectedEmployee('');
        setSelectedDepartment('');
        setSnackbarMessage('Employee assigned successfully!');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Error assigning employee:', error);
        setSnackbarMessage('Failed to assign employee.');
        setSnackbarOpen(true);
      }
    } else {
      setSnackbarMessage('Please select both an employee and a department.');
      setSnackbarOpen(true);
    }
  };

  const handleDeleteDepartment = (departmentId) => {
    if (departmentId) {
      dispatch(deleteDepartment(departmentId));
      setSnackbarMessage('Department deleted successfully!');
      setSnackbarOpen(true);
    } else {
      console.error("No department ID provided for deletion.");
    }
  };

  const handleUpdateDepartment = () => {
    if (editableDepartment) {
      dispatch(updateDepartment({ id: editableDepartment.id, name: editableDepartment.name }));
      setEditDialogOpen(false);
      setEditableDepartment(null);
      setSnackbarMessage('Department updated successfully!');
      setSnackbarOpen(true);
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

  const handleRemoveEmployee = (employeeId) => {
    setEmployeeToRemove(employeeId);
    setConfirmDialogOpen(true);
  };

  const confirmRemoveEmployee = () => {
    if (editableDepartment && employeeToRemove) {
      const updatedEmployees = editableDepartment.employees.filter(emp => emp !== employeeToRemove);
      dispatch(updateDepartment({ id: editableDepartment.id, name: editableDepartment.name, employees: updatedEmployees }));
      setConfirmDialogOpen(false);
      setEmployeeToRemove(null);
      setSnackbarMessage('Employee removed successfully!');
      setSnackbarOpen(true);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredDepartments = departments.filter(department => department.name.toLowerCase().includes(filterDepartment.toLowerCase()));
  const paginatedDepartments = filteredDepartments.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const renderDepartments = () => (
    <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="wrap" gap={4}>
      {paginatedDepartments.map((department) => (
        <Paper key={department.id} style={{ padding: '20px', width: '220px', textAlign: 'center', position: 'relative', backgroundColor: '#f5f5f5' }}>
          {getIcon(department.name)}
          <Typography variant="h6" style={{ marginTop: '10px', color: 'green', textAlign: 'center' }}>{department.name}</Typography>
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
      <DialogTitle>Modifier un departement</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom de departement"
          type="text"
          fullWidth
          variant="standard"
          value={editableDepartment ? editableDepartment.name : ''}
          onChange={handleNameChange}
        />
        {editableDepartment && Array.isArray(editableDepartment.employees) && editableDepartment.employees.length > 0 && (
          <Box mt={2}>
            <Typography variant="h6">Employees</Typography>
            {editableDepartment.employees.map(employee => {
              const emp = employees.find(emp => emp._id === employee);
              return (
                <Box key={employee} display="flex" alignItems="center" justifyContent="space-between">
                  <Typography>{emp ? `${emp.nom} ${emp.prenom}` : 'Unknown Employee'}</Typography>
                  <IconButton color="error" onClick={() => handleRemoveEmployee(employee)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
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
      <DialogTitle>Confirmer le supprision</DialogTitle>
      <DialogContent>
        <Typography>vous etes sur vous voulez supprimer cette employe?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmDialogOpen(false)}>Sortie</Button>
        <Button onClick={confirmRemoveEmployee} color="error">Supprimer</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container style={{ padding: '20px', maxWidth: '1200px' }}>
      <Typography variant="h4" gutterBottom>
        Gestion des departements
      </Typography>
      {renderEditDialog()}
      {renderConfirmDialog()}
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>Ajouter un departement</Typography>
            <TextField
              label="New Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddDepartment} style={{ marginTop: '10px' }}>
              Ajouter
            </Button>
          </Paper>
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>Assigner Employe</Typography>
            <TextField
              select
              label="Selectionner un employe"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              fullWidth
              margin="normal"
            >
              {Array.isArray(employees) && employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {`${employee.nom} ${employee.prenom}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Filtrer un Employes"
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Assigner departement"
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
              Assigner Employe
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            label="Filtrer departement"
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
