// src/views/attendances/AttendanceCard.js
import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const AttendanceCard = ({ attendance }) => {
  const statusColor = attendance.punch === 0 ? "error" : "primary";

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={attendance.picture} alt={attendance.name} />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{attendance.name}</Typography>
            <Typography variant="subtitle2">{attendance.department}</Typography>
            <Typography color={statusColor}>Punch: {attendance.punch === 0 ? 'Missing' : 'Completed'}</Typography>
            <Typography variant="body2">Status: {attendance.status === 1 ? 'Active' : 'Inactive'}</Typography>
            <Typography variant="body2">Time: {dayjs(attendance.timestamp.$date).utc().format('YYYY-MM-DD HH:mm:ss')}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
