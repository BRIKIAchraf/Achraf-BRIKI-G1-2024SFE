import React, { useState } from 'react';
import {
  Box, Card, CardContent, Grid, Typography, TextField, MenuItem, Button, Avatar, Stepper, Step, StepLabel, FormControl, InputLabel, Select
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { blue, green, grey } from '@mui/material/colors';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    user_id: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    type: '',
    login_method: '',
    externalId: '',
    id_planning: '',
    id_departement: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Data:', employeeData);
    // Add your submit logic here
  };

  const steps = ['Personal Information', 'Professional Details', 'Upload Picture'];

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, backgroundColor: grey[50] }}>
          <CardContent>
            <Typography variant="h5" sx={{ color: blue[800], mb: 3, fontWeight: 'bold' }}>
              Add New Employee
            </Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="User ID"
                    variant="outlined"
                    name="user_id"
                    value={employeeData.user_id}
                    onChange={handleInputChange}
                    sx={{ mb: 2, borderRadius: '4px' }}
                  />
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    name="prenom"
                    value={employeeData.prenom}
                    onChange={handleInputChange}
                    sx={{ mb: 2, borderRadius: '4px' }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    name="nom"
                    value={employeeData.nom}
                    onChange={handleInputChange}
                    sx={{ mb: 2, borderRadius: '4px' }}
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
                    sx={{ mb: 2, borderRadius: '4px' }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] } }}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Type"
                    variant="outlined"
                    name="type"
                    value={employeeData.type}
                    onChange={handleInputChange}
                    sx={{ mb: 2, borderRadius: '4px' }}
                  />
                  <FormControl fullWidth sx={{ mb: 2, borderRadius: '4px' }}>
                    <InputLabel>Login Method</InputLabel>
                    <Select
                      label="Login Method"
                      name="login_method"
                      value={employeeData.login_method}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="PassOrFingerOrCard">PassOrFingerOrCard</MenuItem>
                      <MenuItem value="Card">Card</MenuItem>
                      <MenuItem value="FingerAndPass">FingerAndPass</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="External ID"
                    variant="outlined"
                    name="externalId"
                    value={employeeData.externalId}
                    onChange={handleInputChange}
                    sx={{ mb: 2, borderRadius: '4px' }}
                  />
                  <FormControl fullWidth sx={{ mb: 2, borderRadius: '4px' }}>
                    <InputLabel>Planning</InputLabel>
                    <Select
                      label="Planning"
                      name="id_planning"
                      value={employeeData.id_planning}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Planning1">Planning1</MenuItem>
                      <MenuItem value="Planning2">Planning2</MenuItem>
                      <MenuItem value="Planning3">Planning3</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 2, borderRadius: '4px' }}>
                    <InputLabel>Department</InputLabel>
                    <Select
                      label="Department"
                      name="id_departement"
                      value={employeeData.id_departement}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Department1">Department1</MenuItem>
                      <MenuItem value="Department2">Department2</MenuItem>
                      <MenuItem value="Department3">Department3</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] } }}
                  >
                    Next
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ ml: 2, backgroundColor: grey[500], color: 'white', '&:hover': { backgroundColor: grey[700] } }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 2, backgroundColor: blue[500], color: 'white', '&:hover': { backgroundColor: blue[700] } }}
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
                      sx={{ width: 150, height: 150, mb: 2 }}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    startIcon={<SaveIcon />}
                    sx={{ backgroundColor: green[500], color: 'white', '&:hover': { backgroundColor: green[700] } }}
                  >
                    Save Employee
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBack}
                    sx={{ ml: 2, backgroundColor: grey[500], color: 'white', '&:hover': { backgroundColor: grey[700] } }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default AddEmployee;
