// src/views/attendances/AttendanceManagement.js
import React from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb'; // Make sure the import path is correct
import { gridSpacing } from 'config.js'; // Ensure this is correctly defined
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
              <Grid container spacing={2}>
                {attendances ? attendances.map((attendance) => (
                  <Grid item xs={12} sm={6} md={4} key={attendance._id.$oid}>
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
