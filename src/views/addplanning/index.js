import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, List, ListItem, ListItemText, styled, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '25px',
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '& input': {
      fontWeight: 'bold',
    },
    margin: theme.spacing(1, 0),
  }
}));

const AddPlanningForm = () => {
  const [intitule, setIntitule] = useState('');
  const [planningStartDate, setPlanningStartDate] = useState(null);
  const [planningEndDate, setPlanningEndDate] = useState(null);
  const [jours, setJours] = useState([{ h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);
  const [employees, setEmployees] = useState([]); // All available employees
  const [successMessage, setSuccessMessage] = useState('');

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

  useEffect(() => {
    console.log('Updated employees state:', employees);
  }, [employees]);

  const handleJourChange = (index, field, value) => {
    console.log(`Changing day ${index}, field ${field} to ${value}`);
    const newJours = [...jours];
    newJours[index][field] = value;
    setJours(newJours);
  };

  const handleEmployeeChange = (index, value) => {
    console.log(`Changing employees for day ${index} to ${value}`);
    const newJours = [...jours];
    newJours[index].employees = value;
    setJours(newJours);
  };

  const addJour = () => {
    console.log('Adding a new day');
    setJours([...jours, { h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);
  };

  const removeJour = (index) => {
    console.log(`Removing day ${index}`);
    setJours(jours.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const planningData = { intitule, planningStartDate, planningEndDate, jours };
    console.log('Submitting planning data:', planningData); // Log the data being submitted
    try {
      await axios.post('http://localhost:3001/api/planning', planningData);
      console.log('Planning added successfully');
      setSuccessMessage('Planning added successfully!');
      setIntitule('');
      setPlanningStartDate(null);
      setPlanningEndDate(null);
      setJours([{ h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);
    } catch (error) {
      console.error('Error adding planning:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Title"
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Planning Start Date"
              value={planningStartDate}
              onChange={setPlanningStartDate}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Planning End Date"
              value={planningEndDate}
              onChange={setPlanningEndDate}
              renderInput={(params) => <CustomTextField {...params} />}
            />
          </Grid>
          {jours.map((jour, index) => (
            <React.Fragment key={index}>
              {['Morning', 'Afternoon'].map((period, pIndex) => (
                <React.Fragment key={period}>
                  <Grid item xs={3}>
                    <CustomTextField
                      type="time"
                      label={`Heure Entrée ${pIndex + 1} (${period})`}
                      value={jour[`h_entree${pIndex + 1}`]}
                      onChange={(e) => handleJourChange(index, `h_entree${pIndex + 1}`, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <CustomTextField
                      type="time"
                      label={`Heure Sortie ${pIndex + 1} (${period})`}
                      value={jour[`h_sortie${pIndex + 1}`]}
                      onChange={(e) => handleJourChange(index, `h_sortie${pIndex + 1}`, e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Assign Employees</InputLabel>
                  <Select
                    multiple
                    value={jour.employees}
                    onChange={(e) => handleEmployeeChange(index, e.target.value)}
                    renderValue={(selected) => (
                      <List dense>
                        {selected.map((id) => (
                          <ListItem key={id}>
                            <ListItemText primary={employees.find(emp => emp._id === id)?.nom} />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  >
                    {Array.isArray(employees) && employees.map(emp => (
                      <MenuItem key={emp._id} value={emp._id}>
                        {emp.nom} {emp.prenom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <IconButton onClick={() => removeJour(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addJour} variant="outlined">
              Add Day
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Create Planning</Button>
          </Grid>
          {successMessage && (
            <Grid item xs={12}>
              <Typography color="green">{successMessage}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default AddPlanningForm;
