import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, Button, Snackbar, Alert, IconButton, Box
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const EditPlanning = () => {
  const { planningId } = useParams(); // Get the planning ID from the route params
  const navigate = useNavigate();
  const [updatedPlanning, setUpdatedPlanning] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Fetch the planning data based on planningId and update the state
    const fetchPlanning = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/plannings/${planningId}`);
        setUpdatedPlanning(response.data);
      } catch (error) {
        console.error('Error fetching planning data:', error);
      }
    };

    fetchPlanning();
  }, [planningId]);

  const handleInputChange = (e) => {
    setUpdatedPlanning({ ...updatedPlanning, [e.target.name]: e.target.value });
  };

  const handleDayChange = (index, field, value) => {
    const newJours = updatedPlanning.jours.map((jour, i) =>
      i === index ? { ...jour, [field]: value } : jour
    );
    setUpdatedPlanning({ ...updatedPlanning, jours: newJours });
  };

  const handleDateChange = (index, field, value) => {
    const newJours = updatedPlanning.jours.map((jour, i) =>
      i === index ? { ...jour, [field]: value } : jour
    );
    setUpdatedPlanning({ ...updatedPlanning, jours: newJours });
  };

  const handleEmployeeChange = (index, field, value) => {
    const newEmployees = updatedPlanning.employees.map((employee, i) =>
      i === index ? { ...employee, [field]: value } : employee
    );
    setUpdatedPlanning({ ...updatedPlanning, employees: newEmployees });
  };

  const handleAddEmployee = () => {
    const newEmployee = { _id: Date.now().toString(), nom: '', prenom: '' };
    setUpdatedPlanning({ ...updatedPlanning, employees: [...updatedPlanning.employees, newEmployee] });
  };

  const handleRemoveEmployee = (index) => {
    const newEmployees = updatedPlanning.employees.filter((_, i) => i !== index);
    setUpdatedPlanning({ ...updatedPlanning, employees: newEmployees });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/plannings/${planningId}`, updatedPlanning);
      setSnackbarMessage('Planning updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving planning:', error);
      setSnackbarMessage('Error saving planning');
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    navigate('/PlanningManagement');
  };

  if (!updatedPlanning) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            style={{ marginBottom: '16px' }}
          >
            Back to List
          </Button>
          <Card>
            <CardHeader title={<Typography variant="h4" style={{ color: '#1976d2' }}>Edit Planning</Typography>} />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="ID"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="_id"
                    value={updatedPlanning._id}
                    onChange={handleInputChange}
                    disabled
                    style={{ marginBottom: '16px' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Intitule"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="intitule"
                    value={updatedPlanning.intitule}
                    onChange={handleInputChange}
                    style={{ marginBottom: '16px' }}
                  />
                </Grid>
                {updatedPlanning.jours && updatedPlanning.jours.map((jour, index) => (
                  <Box key={jour._id} sx={{ width: '100%', mb: 2, border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'bold' }}>
                      Day {format(parseISO(jour.h_entree1), 'dd MMM yyyy')} to {format(parseISO(jour.h_sortie2), 'dd MMM yyyy')}
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>Date</Typography>
                        <TextField
                          type="date"
                          fullWidth
                          variant="outlined"
                          name="date"
                          value={jour.h_entree1.split('T')[0]}
                          onChange={(e) => handleDateChange(index, 'h_entree1', `${e.target.value}T${jour.h_entree1.split('T')[1]}`)}
                          style={{ marginBottom: '16px' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>Morning Start</Typography>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          name="h_entree1"
                          value={jour.h_entree1.split('T')[1]}
                          onChange={(e) => handleDayChange(index, 'h_entree1', `${jour.h_entree1.split('T')[0]}T${e.target.value}`)}
                          style={{ marginBottom: '16px' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>Morning End</Typography>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          name="h_sortie1"
                          value={jour.h_sortie1.split('T')[1]}
                          onChange={(e) => handleDayChange(index, 'h_sortie1', `${jour.h_sortie1.split('T')[0]}T${e.target.value}`)}
                          style={{ marginBottom: '16px' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>Afternoon Start</Typography>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          name="h_entree2"
                          value={jour.h_entree2.split('T')[1]}
                          onChange={(e) => handleDayChange(index, 'h_entree2', `${jour.h_entree2.split('T')[0]}T${e.target.value}`)}
                          style={{ marginBottom: '16px' }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginBottom: '8px' }}>Afternoon End</Typography>
                        <TextField
                          type="time"
                          fullWidth
                          variant="outlined"
                          name="h_sortie2"
                          value={jour.h_sortie2.split('T')[1]}
                          onChange={(e) => handleDayChange(index, 'h_sortie2', `${jour.h_sortie2.split('T')[0]}T${e.target.value}`)}
                          style={{ marginBottom: '16px' }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ color: '#1976d2', fontWeight: 'bold' }}>Employees</Typography>
                </Grid>
                {updatedPlanning.employees && updatedPlanning.employees.map((employee, index) => (
                  <Grid item xs={12} key={employee._id}>
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                      <TextField
                        label={`Employee ${index + 1} First Name`}
                        type="text"
                        fullWidth
                        variant="outlined"
                        name={`employee_${index}_prenom`}
                        value={employee.prenom}
                        onChange={(e) => handleEmployeeChange(index, 'prenom', e.target.value)}
                        style={{ marginBottom: '16px' }}
                      />
                      <TextField
                        label={`Employee ${index + 1} Last Name`}
                        type="text"
                        fullWidth
                        variant="outlined"
                        name={`employee_${index}_nom`}
                        value={employee.nom}
                        onChange={(e) => handleEmployeeChange(index, 'nom', e.target.value)}
                        style={{ marginBottom: '16px' }}
                      />
                      <IconButton color="error" onClick={() => handleRemoveEmployee(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddEmployee}
                    style={{ marginTop: '8px', marginBottom: '16px' }}
                  >
                    Add Employee
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
    </>
  );
};

export default EditPlanning;
