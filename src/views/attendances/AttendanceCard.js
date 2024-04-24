// src/views/attendances/AttendanceCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const AttendanceCard = ({ attendance }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">User ID: {attendance.user_id}</Typography>
        <Typography variant="subtitle1">Punch: {attendance.punch === 0 ? 'Clock In' : 'Clock Out'}</Typography>
        <Typography variant="body2">Status: {attendance.status === 1 ? 'Active' : 'Inactive'}</Typography>
        <Typography variant="body2">Time: {dayjs(attendance.timestamp.$date).utc().format('YYYY-MM-DD HH:mm:ss')}</Typography>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
