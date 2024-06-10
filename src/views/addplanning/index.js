import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, List, ListItem, ListItemText, Card, CardContent, CardHeader, Divider, styled, Typography, Box } from '@mui/material';
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

const convertTimeToDate = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};

const AddPlanningForm = () => {
  const [intitule, setIntitule] = useState('');
  const [planningStartDate, setPlanningStartDate] = useState(null);
  const [planningEndDate, setPlanningEndDate] = useState(null);
  const [sessions, setSessions] = useState([{ h_entree: '', h_sortie: '' }]);
  const [employees, setEmployees] = useState([]); // All available employees
  const [assignedEmployees, setAssignedEmployees] = useState([]); // Employees assigned to the planning
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://schoolomegup-api.onrender.com/api/employes');
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

  const handleSessionChange = (sessionIndex, field, value) => {
    const newSessions = [...sessions];
    newSessions[sessionIndex][field] = value;
    setSessions(newSessions);
  };

  const handleEmployeeChange = (value) => {
    setAssignedEmployees(value);
  };

  const addSession = () => {
    setSessions([...sessions, { h_entree: '', h_sortie: '' }]);
  };

  const removeSession = (sessionIndex) => {
    setSessions(sessions.filter((_, idx) => idx !== sessionIndex));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const planningData = {
      intitule,
      planningStartDate,
      planningEndDate,
      sessions: sessions.map(session => ({
        h_entree: convertTimeToDate(session.h_entree),
        h_sortie: convertTimeToDate(session.h_sortie)
      })),
      employees: assignedEmployees
    };
    try {
      await axios.post('https://schoolomegup-api.onrender.com/api/plannings', planningData);
      setSuccessMessage('Planning added successfully!');
      setIntitule('');
      setPlanningStartDate(null);
      setPlanningEndDate(null);
      setSessions([{ h_entree: '', h_sortie: '' }]);
      setAssignedEmployees([]);
    } catch (error) {
      console.error('Error adding planning:', error);
    }
  };

  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
      <CardHeader 
        title="Ajouter un Horaire" 
        sx={{ 
          background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)', 
          color: 'white',
          fontWeight: 'bold'
        }}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <Divider variant="middle" sx={{ borderBottomWidth: 2 }} />
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  label="Titre"
                  value={intitule}
                  onChange={(e) => setIntitule(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Debut d'horaire"
                  value={planningStartDate}
                  onChange={setPlanningStartDate}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Fin d'horaire"
                  value={planningEndDate}
                  onChange={setPlanningEndDate}
                  renderInput={(params) => <CustomTextField {...params} />}
                />
              </Grid>
              {sessions.map((session, sessionIndex) => (
                <Grid container spacing={2} key={sessionIndex} sx={{ alignItems: 'flex-end', marginTop: 2 }}>
                  <Grid item xs={5}>
                    <CustomTextField
                      type="time"
                      label={`Heure Entrée ${sessionIndex + 1}`}
                      value={session.h_entree}
                      onChange={(e) => handleSessionChange(sessionIndex, 'h_entree', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <CustomTextField
                      type="time"
                      label={`Heure Sortie ${sessionIndex + 1}`}
                      value={session.h_sortie}
                      onChange={(e) => handleSessionChange(sessionIndex, 'h_sortie', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeSession(sessionIndex)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addSession} variant="outlined" fullWidth>
                  Ajouter une session
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Assigner un employe</InputLabel>
                  <Select
                    multiple
                    value={assignedEmployees}
                    onChange={(e) => handleEmployeeChange(e.target.value)}
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
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Ajouter l'Horaire
                </Button>
              </Grid>
              {successMessage && (
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <Typography color="green" align="center">{successMessage}</Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default AddPlanningForm;
