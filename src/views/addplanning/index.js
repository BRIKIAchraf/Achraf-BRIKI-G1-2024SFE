import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios'; // Assuming you are using axios for API calls

const AddPlanningForm = () => {
  const [intitule, setIntitule] = useState('');
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    // Fetch all employees from the backend when the component mounts
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees'); // Adjust the endpoint according to your backend route
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeSelect = (event) => {
    const selectedEmployeeId = event.target.value;
    const employee = employees.find(emp => emp._id === selectedEmployeeId);
    setSelectedEmployees([...selectedEmployees, employee]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to your backend to create the new planning
      const response = await axios.post('/api/plannings', { intitule, selectedEmployees });
      console.log('New planning created:', response.data);
      // Reset form fields and selected employees
      setIntitule('');
      setSelectedEmployees([]);
    } catch (error) {
      console.error('Error creating new planning:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={intitule}
            onChange={(e) => setIntitule(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Employees</InputLabel>
            <Select
              multiple
              value={selectedEmployees.map(emp => emp._id)}
              onChange={handleEmployeeSelect}
            >
              {employees.map(employee => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.nom} {employee.prenom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Create Planning</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPlanningForm;
