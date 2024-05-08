import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, MenuItem, Grid } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@date-io/date-fns';  // Make sure this import is correct

const LeaveRequestForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leaveType, setLeaveType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ startDate, endDate, leaveType });
    // Implement the API call or other logic to handle the submission here
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ padding: 3, margin: 'auto', maxWidth: 500, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Request Leave
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={date => setStartDate(date)}  // Changed to use an arrow function
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={date => setEndDate(date)}  // Changed to use an arrow function
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Type of Leave"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                fullWidth
              >
                <MenuItem value="annual">Annual</MenuItem>
                <MenuItem value="sick">Sick</MenuItem>
                <MenuItem value="maternity">Maternity</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default LeaveRequestForm;
