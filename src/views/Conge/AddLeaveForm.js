import React, { useState } from 'react';
import { TextField, Button, Grid, Avatar, Typography } from '@mui/material';

const AddLeaveForm = () => {
  const [leaveName, setLeaveName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmployeeSelect = (event) => {
    const selectedEmployee = event.target.value;
    setSelectedEmployees([...selectedEmployees, selectedEmployee]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage('Leave added successfully!');
    setLeaveName('');
    setStartDate('');
    setEndDate('');
    setSelectedEmployees([]);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Leave Name"
            value={leaveName}
            onChange={(e) => setLeaveName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Select Employee"
            value=""
            onChange={handleEmployeeSelect}
          >
            {/* Render dropdown options from employee list */}
          </TextField>
        </Grid>
        {selectedEmployees.map((employee, index) => (
          <Grid key={index} item xs={6}>
            <Avatar src={employee.avatar} alt={employee.name} />
            <Typography>{employee.name}</Typography>
            <Typography>{employee.department}</Typography>
          </Grid>
        ))}
      </Grid>
      <Button type="submit" variant="contained" color="primary">Add</Button>
      {successMessage && (
        <Typography>{successMessage}</Typography>
      )}
    </form>
  );
};

export default AddLeaveForm;
