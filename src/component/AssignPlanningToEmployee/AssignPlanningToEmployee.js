import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignPlanningToEmployee } from '../../store/employeeSlice'; // Make sure to create this action
import { TextField, Button, Grid, Typography, Select, MenuItem } from '@mui/material';

const AssignPlanningToEmployee = ({ employees, plannings }) => {
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedPlanning, setSelectedPlanning] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(assignPlanningToEmployee({ employeeId: selectedEmployee, planningId: selectedPlanning }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Assign Planning to Employee</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        value={selectedEmployee}
                        onChange={e => setSelectedEmployee(e.target.value)}
                        displayEmpty
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>
                            Select Employee
                        </MenuItem>
                        {employees.map((employee) => (
                            <MenuItem key={employee._id} value={employee._id}>{employee.nom}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Select
                        value={selectedPlanning}
                        onChange={e => setSelectedPlanning(e.target.value)}
                        displayEmpty
                        fullWidth
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" disabled>
                            Select Planning
                        </MenuItem>
                        {plannings.map((planning) => (
                            <MenuItem key={planning._id} value={planning._id}>{planning.intitule}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Assign</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AssignPlanningToEmployee;
