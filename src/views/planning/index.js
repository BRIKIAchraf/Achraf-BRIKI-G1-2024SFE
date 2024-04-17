import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Stack } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const PlanningManagement = () => {
  const [plannings, setPlannings] = useState([]);
  const [intitule, setIntitule] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Fetch plannings from backend when component mounts
    fetchPlannings();
  }, []);

  const fetchPlannings = async () => {
    try {
      const response = await fetch('/api/plannings'); // Replace with your backend API endpoint
      const data = await response.json();
      setPlannings(data);
    } catch (error) {
      console.error('Error fetching plannings:', error);
    }
  };

  const handleCreatePlanning = async () => {
    try {
      const response = await fetch('/api/plannings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ intitule, date, time })
      });
      if (response.ok) {
        fetchPlannings(); // Refresh plannings list after creation
        setIntitule('');
        setDate(null);
        setTime(null);
      } else {
        console.error('Failed to create planning');
      }
    } catch (error) {
      console.error('Error creating planning:', error);
    }
  };

  const handleDeletePlanning = async (id) => {
    try {
      const response = await fetch(`/api/plannings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPlannings(); // Refresh plannings list after deletion
      } else {
        console.error('Failed to delete planning');
      }
    } catch (error) {
      console.error('Error deleting planning:', error);
    }
  };

  return (
    <>
      <Breadcrumb title="Planning Management">
        <Typography variant="subtitle2" color="inherit">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Planning Management
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Planning List
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Intitule</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plannings.map((planning) => (
                    <TableRow key={planning._id}>
                      <TableCell>{planning._id}</TableCell>
                      <TableCell>{planning.intitule}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="error" onClick={() => handleDeletePlanning(planning._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Create Planning
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <TextField
                label="Intitule"
                variant="outlined"
                fullWidth
                value={intitule}
                onChange={(e) => setIntitule(e.target.value)}
                sx={{ mb: 2 }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2} direction="row">
                  <DesktopDatePicker
                    label="Date du Planning"
                    inputFormat="dd/MM/yyyy"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <TimePicker
                    label="Heure du Planning"
                    value={time}
                    onChange={(newValue) => setTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
              <Button variant="contained" color="primary" onClick={handleCreatePlanning}>Create</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlanningManagement;
