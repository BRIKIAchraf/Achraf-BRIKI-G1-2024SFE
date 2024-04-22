import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb'; // Ensure this is correctly imported
import { gridSpacing } from 'config.js';        // Ensure this is correctly imported
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';                      // Ensure dayjs is correctly installed and imported

const AttendanceManagement = () => {
  const [attendances, setAttendances] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Handle adding a dummy attendance
  const handleAddAttendance = () => {
    const newAttendance = {
      _id: Date.now(), // Simple unique ID for example purposes
      nom: 'Sample',
      prenom: 'User',
      date: selectedDate.format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm:ss')
    };
    setAttendances([...attendances, newAttendance]);
  };

  // Handle deleting all attendances
  const handleDeleteAllAttendances = () => {
    setAttendances([]);
  };

  // Filter attendances based on the search term and selected date
  const filteredAttendances = attendances.filter((attendance) =>
    attendance.nom.toLowerCase().includes(searchTerm.toLowerCase()) &&
    attendance.date === selectedDate.format('YYYY-MM-DD')
  );

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
            <CardHeader title={<Typography component="div" variant="h4">All Attendances</Typography>} />
            <Divider />
            <CardContent>
              <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Filter by Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button variant="contained" color="primary" onClick={handleAddAttendance} sx={{ mb: 2 }}>
                Add Dummy Attendance
              </Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prenom</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAttendances.map((attendance) => (
                    <TableRow key={attendance._id}>
                      <TableCell>{attendance._id}</TableCell>
                      <TableCell>{attendance.nom}</TableCell>
                      <TableCell>{attendance.prenom}</TableCell>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="contained" color="error" onClick={handleDeleteAllAttendances}>
                Delete All Attendances
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceManagement;
