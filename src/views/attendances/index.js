// src/views/attendances/AttendanceManagement.js
import React from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Paper } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb'; // Check path correctness
import { gridSpacing } from 'config.js'; // Check this definition
import AttendanceCard from './AttendanceCard';

const AttendanceManagement = ({ attendances }) => {
  return (
    <>
      <Breadcrumb title="Attendance Management">
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="primary">Attendance Management</Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h4">All Attendances</Typography>} />
            <Divider />
            <CardContent>
              <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Grid container spacing={2}>
                  <Grid item><Typography variant="h6">Picture</Typography></Grid>
                  <Grid item xs><Typography variant="h6">Name & Department</Typography></Grid>
                  <Grid item><Typography variant="h6">Punch Status</Typography></Grid>
                  <Grid item><Typography variant="h6">Active Status</Typography></Grid>
                  <Grid item><Typography variant="h6">Timestamp</Typography></Grid>
                </Grid>
              </Paper>
              <Grid container spacing={2}>
                {attendances ? attendances.map((attendance) => (
                  <Grid item xs={12} key={attendance._id.$oid}>
                    <AttendanceCard attendance={attendance} />
                  </Grid>
                )) : <Typography>No data available</Typography>}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceManagement;
