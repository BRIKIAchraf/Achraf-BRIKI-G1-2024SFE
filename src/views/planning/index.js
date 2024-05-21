import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPlannings, deletePlanning } from '../../store/planningSlice';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead,
  TableBody, TableRow, TableCell, Button, TableContainer, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField, Checkbox, Toolbar, Alert, Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const PlanningManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plannings, status } = useSelector(state => state.planning);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedPlannings, setSelectedPlannings] = useState([]);
  const [filter, setFilter] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    dispatch(fetchPlannings());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deletePlanning(deleteId));
    setSnackbarMessage('Planning deleted successfully!');
    setSnackbarOpen(true);
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = plannings.map((n) => n._id);
      setSelectedPlannings(newSelected);
      return;
    }
    setSelectedPlannings([]);
  };

  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selectedPlannings.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedPlannings, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedPlannings.slice(1));
    } else if (selectedIndex === selectedPlannings.length - 1) {
      newSelected = newSelected.concat(selectedPlannings.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedPlannings.slice(0, selectedIndex),
        selectedPlannings.slice(selectedIndex + 1),
      );
    }

    setSelectedPlannings(newSelected);
  };

  const handleDeleteSelected = () => {
    selectedPlannings.forEach((id) => {
      dispatch(deletePlanning(id));
    });
    setSnackbarMessage('Selected plannings deleted successfully!');
    setSnackbarOpen(true);
    setSelectedPlannings([]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPlannings = (plannings || []).filter(planning =>
    planning.intitule.toLowerCase().includes(filter.toLowerCase())
  );

  const isSelected = (id) => selectedPlannings.indexOf(id) !== -1;

  const handleEditClick = (id) => {
    navigate(`/edit-planning/${id}`);
  };

  return (
    <>
      <Breadcrumb title="Planning Management">
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="primary">Planning Management</Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Toolbar style={{ backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <Typography variant="h6" style={{ color: '#1976d2', marginRight: 'auto' }}>
              Planning Management
            </Typography>
            <TextField
              variant="outlined"
              label="Filter by Intitule"
              value={filter}
              onChange={handleFilterChange}
              style={{ marginRight: '16px' }}
            />
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteSelected}
              disabled={selectedPlannings.length === 0}
              style={{ marginLeft: '16px' }}
            >
              Delete Selected
            </Button>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h4">Planning List</Typography>} />
            <Divider />
            <CardContent>
              {status === 'loading' ? (
                <CircularProgress />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedPlannings.length > 0 && selectedPlannings.length < plannings.length}
                            checked={plannings.length > 0 && selectedPlannings.length === plannings.length}
                            onChange={handleSelectAllClick}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>Intitule</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Employees</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredPlannings.map((planning) => (
                        <TableRow key={planning._id} selected={isSelected(planning._id)}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected(planning._id)}
                              onChange={(event) => handleCheckboxClick(event, planning._id)}
                              color="primary"
                            />
                          </TableCell>
                          <TableCell>{planning.intitule}</TableCell>
                          <TableCell>
                            <div>
                              {planning.jours && planning.jours.map((jour) => (
                                <div key={jour._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', backgroundColor: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
                                  <ScheduleIcon style={{ marginRight: '8px', color: '#1976d2' }} />
                                  <div>
                                    <strong>Day:</strong> {new Date(jour.h_entree1).toLocaleDateString()}<br />
                                    Morning: {new Date(jour.h_entree1).toLocaleTimeString()} - {new Date(jour.h_sortie1).toLocaleTimeString()}<br />
                                    Afternoon: {new Date(jour.h_entree2).toLocaleTimeString()} - {new Date(jour.h_sortie2).toLocaleTimeString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {planning.employees && planning.employees.length > 0 ? (
                              planning.employees.map((employee) => (
                                <div key={employee._id} style={{ backgroundColor: '#e3f2fd', padding: '8px', borderRadius: '4px', marginBottom: '4px' }}>
                                  {employee.nom ? `${employee.nom} ${employee.prenom}` : 'Employee name not found'}
                                </div>
                              ))
                            ) : (
                              <Typography>No employees found</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon />}
                              style={{ marginBottom: '8px' }}
                              onClick={() => handleEditClick(planning._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => handleDeleteClick(planning._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this planning? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlanningManagement;
