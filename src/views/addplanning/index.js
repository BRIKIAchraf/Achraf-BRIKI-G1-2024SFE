import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlanning } from '../../store/planningSlice';
import { fetchEmployees } from '../../store/employeeSlice';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, List, ListItem, ListItemText, Typography, styled } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

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
  const dispatch = useDispatch();
  const { employees, status: employeesStatus } = useSelector(state => state.employees);

  const [intitule, setIntitule] = useState('');
  const [planningStartDate, setPlanningStartDate] = useState(null);
  const [planningEndDate, setPlanningEndDate] = useState(null);
  const [jours, setJours] = useState([{ h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);

  useEffect(() => {
    if (employeesStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employeesStatus]);

  const handleJourChange = (index, field, value) => {
    const newJours = [...jours];
    newJours[index][field] = value;
    setJours(newJours);
  };

  const handleEmployeeChange = (index, value) => {
    const newJours = [...jours];
    newJours[index].employees = value;
    setJours(newJours);
  };

  const addJour = () => {
    setJours([...jours, { h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);
  };

  const removeJour = (index) => {
    setJours(jours.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const planningData = { intitule, planningStartDate, planningEndDate, jours };
    dispatch(addPlanning(planningData))
      .then(() => {
        setIntitule('');
        setPlanningStartDate(null);
        setPlanningEndDate(null);
        setJours([{ h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '', employees: [] }]);
      })
      .catch(error => {
        console.error('Error creating new planning:', error);
      });
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
              textField={(params) => <CustomTextField {...params} />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Planning End Date"
              value={planningEndDate}
              onChange={setPlanningEndDate}
              textField={(params) => <CustomTextField {...params} />}
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
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default AddPlanningForm;
