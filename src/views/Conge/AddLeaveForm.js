import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Avatar, Typography, MenuItem, Card, CardContent, CardHeader, Divider, Snackbar, Alert } from '@mui/material';
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeaveForm = () => {
  const [leaveName, setLeaveName] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [leaveType, setLeaveType] = useState('');
  const [status, setStatus] = useState('pending');
  const [employees, setEmployees] = useState([]); // All available employees
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employes');
        console.log('Fetched employees:', response.data); // Log the fetched employees
        if (Array.isArray(response.data.employees)) {
          setEmployees(response.data.employees);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (event) => {
    const selectedEmployeeId = event.target.value;
    const employee = employees.find(emp => emp._id === selectedEmployeeId);
    if (employee && !selectedEmployees.some(emp => emp._id === selectedEmployeeId)) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const leaveData = {
      leaveName,
      startDate: dateRange[0],
      endDate: dateRange[1],
      selectedEmployees: selectedEmployees.map(emp => emp._id),
      type: leaveType,
      status
    };
    console.log('Submitting leave data:', leaveData); // Log the data being submitted
    try {
      await axios.post('http://localhost:3001/api/leave/assign', leaveData);
      setSuccessMessage('Leave added successfully!');
      setLeaveName('');
      setDateRange([null, null]);
      setSelectedEmployees([]);
      setLeaveType('');
      setStatus('pending');
      setOpenSnackbar(true);
      navigate('/LeaveManagement'); // Redirect to the leave list page
    } catch (error) {
      console.error('Error adding leave:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
      <CardHeader 
        title="Ajouter un congé" 
        sx={{ 
          background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)', 
          color: 'white',
          fontWeight: 'bold'
        }}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="titulaire de conge"
                value={leaveName}
                onChange={(e) => setLeaveName(e.target.value)}
                required
                sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }}
              />
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid item xs={12}>
                <DateRangePicker
                  startText="Debut de congé"
                  endText="Fin de congé"
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                  textField={(params) => (
                    <>
                      <TextField {...params[0]} required sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }} />
                      <Grid sx={{ mx: 2 }}> to </Grid>
                      <TextField {...params[1]} required sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }} />
                    </>
                  )}
                />
              </Grid>
            </LocalizationProvider>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Selectionner un employee"
                value=""
                onChange={handleEmployeeSelect}
               
                sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    {employee.nom} {employee.prenom}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Type"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                helperText="Select the type of leave"
                required
                sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }}
              >
                <MenuItem value="annual">Annuel</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="maternity">Maternity</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                helperText="Select the status of the leave"
                required
                sx={{ input: { borderRadius: '12px' }, borderRadius: '12px' }}
              >
                <MenuItem value="pending">En attend</MenuItem>
                <MenuItem value="approved">Approuve</MenuItem>
                <MenuItem value="denied">Refusee</MenuItem>
              </TextField>
            </Grid>
            {selectedEmployees.map((employee, index) => (
              <Grid key={index} item xs={6}>
                <Avatar src={employee.picture} alt={employee.nom} />
                <Typography>{employee.nom} {employee.prenom}</Typography>
                <Typography>{employee.department}</Typography>
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '20px', fontWeight: 'bold' }}  >Ajouter congé</Button>
          {successMessage && (
            <Typography color="green">{successMessage}</Typography>
          )}
        </form>
      </CardContent>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top center
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AddLeaveForm;
