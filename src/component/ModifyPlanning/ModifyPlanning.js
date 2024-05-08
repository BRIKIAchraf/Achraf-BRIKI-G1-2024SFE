import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlanning } from '../../store/planningSlice'; // Ensure this thunk exists
import { TextField, Button, Grid, Typography } from '@mui/material';

const ModifyPlanning = ({ planningId }) => {
    const [intitule, setIntitule] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // You should fetch the planning details here and set them
        // For example: setIntitule(planningDetails.intitule);
    }, [planningId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updatePlanning({ id: planningId, data: { intitule } }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Modify Planning</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Intitulé"
                        variant="outlined"
                        required
                        fullWidth
                        value={intitule}
                        onChange={e => setIntitule(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Update Planning</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ModifyPlanning;
