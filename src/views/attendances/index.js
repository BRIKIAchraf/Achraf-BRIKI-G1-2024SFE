import React from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Paper } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const AttendanceCard = ({ attendance }) => {
  const punchStatus = attendance.punch === 0 ? "Missing" : "Completed";
  const activeStatus = attendance.status === 1 ? "Active" : "Inactive";
  const formattedDate = new Date(attendance.timestamp).toLocaleString(); // Formatting timestamp

  return (
    <Grid container spacing={2} alignItems="center" key={attendance.user_id}>
      <Grid item><Typography>{attendance.user_id}</Typography></Grid>
      <Grid item xs><Typography>{attendance.uid}</Typography></Grid>
      <Grid item><Typography>{punchStatus}</Typography></Grid>
      <Grid item><Typography>{activeStatus}</Typography></Grid>
      <Grid item><Typography>{formattedDate}</Typography></Grid>
    </Grid>
  );
};

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
                  <Grid item><Typography variant="h6">User ID</Typography></Grid>
                  <Grid item xs><Typography variant="h6">UID</Typography></Grid>
                  <Grid item><Typography variant="h6">Punch Status</Typography></Grid>
                  <Grid item><Typography variant="h6">Active Status</Typography></Grid>
                  <Grid item><Typography variant="h6">Timestamp</Typography></Grid>
                </Grid>
              </Paper>
              <Grid container spacing={2}>
                {attendances ? attendances.map(attendance => (
                  <AttendanceCard attendance={attendance} key={attendance._id} />
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
