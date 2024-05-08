import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlanning } from '../../store/planningSlice'; // Ensure this thunk exists
import { TextField, Button, Grid, Typography } from '@mui/material';

const AddPlanning = () => {
    const [intitule, setIntitule] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addPlanning({ intitule }));
        setIntitule(''); // Clear form
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Add New Planning</Typography>
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
                    <Button type="submit" variant="contained" color="primary">Add Planning</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddPlanning;
