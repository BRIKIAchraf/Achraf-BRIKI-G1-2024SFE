import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; // Assuming axios for API calls

const AddPlanningForm = () => {
  const [intitule, setIntitule] = useState('');
  const [jours, setJours] = useState([
    { h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '' }
  ]);

  const handleJourChange = (index, field, value) => {
    const newJours = [...jours];
    newJours[index][field] = value;
    setJours(newJours);
  };

  const addJour = () => {
    setJours([...jours, { h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '' }]);
  };

  const removeJour = (index) => {
    setJours(jours.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const planningData = { intitule, jours };
      const response = await axios.post('/api/plannings', planningData);
      console.log('New planning created:', response.data);
      setIntitule('');
      setJours([{ h_entree1: '', h_sortie1: '', h_entree2: '', h_sortie2: '' }]);
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
        {jours.map((jour, index) => (
          <React.Fragment key={index}>
            <Grid item xs={3}>
              <TextField
                type="time"
                label="Heure Entrée 1"
                value={jour.h_entree1}
                onChange={(e) => handleJourChange(index, 'h_entree1', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="time"
                label="Heure Sortie 1"
                value={jour.h_sortie1}
                onChange={(e) => handleJourChange(index, 'h_sortie1', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="time"
                label="Heure Entrée 2"
                value={jour.h_entree2}
                onChange={(e) => handleJourChange(index, 'h_entree2', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                type="time"
                label="Heure Sortie 2"
                value={jour.h_sortie2}
                onChange={(e) => handleJourChange(index, 'h_sortie2', e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
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
  );
};

export default AddPlanningForm;
