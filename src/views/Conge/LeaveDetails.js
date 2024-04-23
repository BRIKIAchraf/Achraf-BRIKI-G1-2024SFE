// components/LeaveDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, AvatarGroup, Grid } from '@mui/material';

const LeaveDetails = ({ leaves }) => {
  const { leaveId } = useParams();
  const leave = leaves.find(l => l.id.toString() === leaveId);

  if (!leave) {
    return <Typography variant="h6">Leave not found</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{leave.type}</Typography>
        {leave.employees.map((emp, index) => (
          <Grid container key={index} spacing={2} alignItems="center">
            <Grid item>
              <Avatar alt={emp.name} src={emp.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">{emp.name}</Typography>
            </Grid>
          </Grid>
        ))}
      </CardContent>
    </Card>
  );
};

export default LeaveDetails;
