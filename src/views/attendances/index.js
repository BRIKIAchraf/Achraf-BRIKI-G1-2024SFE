import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, Button } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Ensure this plugin is installed

dayjs.extend(customParseFormat);

const AttendanceManagement = () => {
  const [attendances, setAttendances] = useState([]);
  const [filters, setFilters] = useState({ nom: '', prenom: '', date: dayjs(), time: '' });

  const handleAddAttendance = () => {
    const newAttendance = {
      _id: Date.now(),
      nom: 'Sample',
      prenom: 'User',
      date: dayjs().format('YYYY-MM-DD'),
      time: dayjs().format('HH:mm:ss')
    };
    setAttendances([...attendances, newAttendance]);
  };

  const handleDeleteAllAttendances = () => {
    setAttendances([]);
  };

  const handleDeleteByDate = (date) => {
    setAttendances(attendances.filter(a => a.date !== dayjs(date).format('YYYY-MM-DD')));
  };

  const handleDeleteByMonth = (month) => {
    setAttendances(attendances.filter(a => dayjs(a.date).format('YYYY-MM') !== month));
  };

  const filteredAttendances = attendances.filter(attendance =>
    attendance.nom.toLowerCase().includes(filters.nom.toLowerCase()) &&
    attendance.prenom.toLowerCase().includes(filters.prenom.toLowerCase()) &&
    (filters.date ? attendance.date === dayjs(filters.date).format('YYYY-MM-DD') : true) &&
    (filters.time ? attendance.time === filters.time : true)
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
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={filters.nom}
                    onChange={e => setFilters({ ...filters, nom: e.target.value })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Search by Prenom"
                    variant="outlined"
                    fullWidth
                    value={filters.prenom}
                    onChange={e => setFilters({ ...filters, prenom: e.target.value })}
                  />
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Filter by Date"
                      value={filters.date}
                      onChange={(newValue) => {
                        setFilters({ ...filters, date: newValue });
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="Filter by Time"
                    variant="outlined"
                    fullWidth
                    value={filters.time}
                    onChange={e => setFilters({ ...filters, time: e.target.value })}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {filteredAttendances.map((attendance) => (
                  <Grid item xs={12} sm={6} md={4} key={attendance._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1">{attendance.nom} {attendance.prenom}</Typography>
                        <Typography variant="body2">{attendance.date}</Typography>
                        <Typography variant="body2">{attendance.time}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button variant="contained" color="primary" onClick={handleAddAttendance} sx={{ marginTop: 2 }}>
                Add Dummy Attendance
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteByDate(dayjs().format('YYYY-MM-DD'))} sx={{ marginTop: 2, marginLeft: 2 }}>
                Delete Today's Attendances
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteByMonth(dayjs().format('YYYY-MM'))} sx={{ marginTop: 2, marginLeft: 2 }}>
                Delete This Month's Attendances
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteAllAttendances} sx={{ marginTop: 2, marginLeft: 2 }}>
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
