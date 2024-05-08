import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Grid, CircularProgress } from '@mui/material';

const LeaveDetails = ({ leaves }) => {
  const { leaveId } = useParams();  // This assumes leaveId is the URL param
  const leave = leaves.find(l => l.id === parseInt(leaveId));

  if (!leave) {
    return <Typography variant="h6">Leave not found</Typography>;
  }

  if (!leave) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card sx={{ margin: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Leave Details
        </Typography>
        <Typography variant="h6">Name: {leave.type}</Typography>
        <Typography variant="body1">Status: {leave.status}</Typography>
        <Typography variant="body1">Period: {leave.startDate} to {leave.endDate}</Typography>
        <Typography variant="body1">Type: {leave.type}</Typography>
        <Grid container spacing={2}>
          {leave.employees.map((emp, index) => (
            <Grid item key={index}>
              <Avatar src={emp.avatar} alt={emp.name} />
              <Typography variant="body2">{emp.name}</Typography>
              <Typography variant="caption">{emp.department}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LeaveDetails;
