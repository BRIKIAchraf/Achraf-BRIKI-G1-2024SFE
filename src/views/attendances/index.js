import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const AttendanceManagement = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    // Fetch all attendances from backend when component mounts
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await fetch('/api/attendances'); // Replace with your backend API endpoint
      const data = await response.json();
      setAttendances(data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  const handleDeleteAllAttendances = async () => {
    try {
      const response = await fetch('/api/attendances', {
        method: 'DELETE'
      });
      if (response.ok) {
        setAttendances([]); // Clear attendances list after deletion
      } else {
        console.error('Failed to delete all attendances');
      }
    } catch (error) {
      console.error('Error deleting all attendances:', error);
    }
  };

  return (
    <>
      <Breadcrumb title="Attendance Management">
        <Typography variant="subtitle2" color="inherit">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Attendance Management
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  All Attendances
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendances.map((attendance) => (
                    <TableRow key={attendance._id}>
                      <TableCell>{attendance._id}</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <Divider />
            <Button variant="contained" color="error" onClick={handleDeleteAllAttendances}>Delete All Attendances</Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceManagement;
