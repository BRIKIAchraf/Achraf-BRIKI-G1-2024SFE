import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Card, CardContent, Grid, Typography, TextField, MenuItem, Button, Avatar, Stepper, Step, StepLabel, FormControl, InputLabel, Select, Snackbar, Alert
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { blue, green, grey } from '@mui/material/colors';
const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    type: '',
    login_method: '',
    id_planning: '',
    id_departement: '',
    picture: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [plannings, setPlannings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loginMethods, setLoginMethods] = useState([]);

  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/plannings');
        setPlannings(response.data);
        console.log('Fetched plannings:', response.data);
      } catch (error) {
        console.error('Error fetching plannings:', error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/departements');
        setDepartments(response.data);
        console.log('Fetched departments:', response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    const fetchLoginMethods = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/loginMethods');
        setLoginMethods(response.data);
        console.log('Fetched login methods:', response.data);
      } catch (error) {
        console.error('Error fetching login methods:', error);
      }
    };

    fetchPlannings();
    fetchDepartments();
    fetchLoginMethods();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEmployeeData((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/employes', employeeData);
      setSnackbarOpen(true);
      setEmployeeData({
        nom: '',
        prenom: '',
        date_naissance: '',
        type: '',
        login_method: '',
        id_planning: '',
        id_departement: '',
        picture: ''
      });
      setImagePreview(null);
      setActiveStep(0);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const steps = ['Personal Information', 'Professional Details', 'Upload Picture'];

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 5, backgroundColor: grey[50], maxWidth: 900 }}>
          <CardContent>
            <Typography variant="h4" sx={{ color: blue[800], mb: 4, fontWeight: 'bold' }}>
              Add New Employee
            </Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    name="prenom"
                    value={employeeData.prenom}
                    onChange={handleInputChange}
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    name="nom"
                    value={employeeData.nom}
                    onChange={handleInputChange}
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}
                  />
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    name="date_naissance"
                    value={employeeData.date_naissance}
                    onChange={handleInputChange}
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] }, height: 64, width: '100%' }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Type"
                    variant="outlined"
                    name="type"
                    value={employeeData.type}
                    onChange={handleInputChange}
                    sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}
                  />
                  <FormControl fullWidth sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}>
                    <InputLabel>Login Method</InputLabel>
                    <Select
                      label="Login Method"
                      name="login_method"
                      value={employeeData.login_method}
                      onChange={handleInputChange}
                      sx={{ borderRadius: '8px', height: 64 }}
                    >
                      {loginMethods.map((method) => (
                        <MenuItem key={method._id} value={method._id}>
                          {method.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}>
                    <InputLabel>Planning</InputLabel>
                    <Select
                      label="Planning"
                      name="id_planning"
                      value={employeeData.id_planning}
                      onChange={handleInputChange}
                      sx={{ borderRadius: '8px', height: 64 }}
                    >
                      {plannings.map((planning) => (
                        <MenuItem key={planning._id} value={planning._id}>
                          {planning.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '8px', height: 64 } }}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      name="id_departement"
                      value={employeeData.id_departement}
                      onChange={handleInputChange}
                      sx={{ borderRadius: '8px', height: 64 }}
                    >
                      {departments.map((department) => (
                        <MenuItem key={department._id} value={department._id}>
                          {department.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] }, height: 64, width: '100%' }}
                  >
                    Next
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ mt: 2, backgroundColor: grey[500], color: 'white', '&:hover': { backgroundColor: grey[700] }, height: 64, width: '100%' }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 3, backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] }, height: 64, width: '100%' }}
                  >
                    Upload Picture
                    <input
                      type="file"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                  {imagePreview && (
                    <Avatar
                      alt="Employee Picture"
                      src={imagePreview}
                      sx={{ width: 200, height: 200, mb: 3 }}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    sx={{ backgroundColor: green[500], color: 'white', '&:hover': { backgroundColor: green[700] }, height: 64, width: '100%' }}
                  >
                    Save Employee
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ mt: 2, backgroundColor: grey[500], color: 'white', '&:hover': { backgroundColor: grey[700] }, height: 64, width: '100%' }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Employee added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEmployee;
