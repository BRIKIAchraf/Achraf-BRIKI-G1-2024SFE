import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Paper, TextField, MenuItem, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import { TimePicker, DatePicker } from '@mui/lab';


const AttendanceCard = ({ attendance }) => {
  const punchStatus = attendance.punch === 0 ? "Missing" : "Completed";
  const activeStatus = attendance.status === 1 ? "Active" : "Inactive";
  const formattedDate = new Date(attendance.timestamp).toLocaleString(); // Formatting timestamp

  return (
    <TableRow key={attendance.user_id}>
      <TableCell>{attendance.user_id}</TableCell>
      <TableCell>{attendance.uid}</TableCell>
      <TableCell>{punchStatus}</TableCell>
      <TableCell>{activeStatus}</TableCell>
      <TableCell>{formattedDate}</TableCell>
    </TableRow>
  );
};

const departments = ['Department A', 'Department B', 'Department C']; // Sample department list

const AttendanceManagement = ({ attendances }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchName, setSearchName] = useState('');
  const [searchTime, setSearchTime] = useState(null); // Using null for the time state
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchPeriod, setSearchPeriod] = useState(null); // Using null for the period state
  const [filteredAttendances, setFilteredAttendances] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    filterAttendances(searchName, searchTime, searchDepartment, searchPeriod);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchTimeChange = (time) => {
    setSearchTime(time);
  };

  const handleSearchDepartmentChange = (event) => {
    setSearchDepartment(event.target.value);
  };

  const handleSearchPeriodChange = (date) => {
    setSearchPeriod(date);
  };

  const handleDeleteAttendanceForPeriod = (period) => {
    // Write your logic to delete attendances for the specified period
    // This could involve making an API call to your backend server
    console.log(`Deleting attendances for period: ${period}`);
  };

  const filterAttendances = (name, time, department, period) => {
    let filtered = attendances.filter(attendance => {
      return (
        attendance.user_id.toLowerCase().includes(name.toLowerCase()) &&
        attendance.department.toLowerCase().includes(department.toLowerCase())
        // Add additional conditions for time and period if necessary
        // For example:
        // attendance.timestamp.includes(time) &&
        // attendance.period.includes(period)
      );
    });
    setFilteredAttendances(filtered);
  };

  return (
    <>
      <Breadcrumb title="Attendance Management" sx={{ bgcolor: 'primary.main', color: 'white', padding: '12px' }}>
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="inherit">Attendance Management</Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h4" sx={{ color: 'primary.main' }}>All Attendances</Typography>} sx={{ borderBottom: '1px solid', borderBottomColor: 'divider' }} />
            <Divider />
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchName}
                    onChange={handleSearchNameChange}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                <TimePicker
  label="Search by Time"
  variant="outlined"
  fullWidth
  value={searchTime}
  onChange={handleSearchTimeChange}
/>

                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    label="Search by Department"
                    variant="outlined"
                    fullWidth
                    value={searchDepartment}
                    onChange={handleSearchDepartmentChange}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    label="Search by Period"
                    variant="outlined"
                    fullWidth
                    value={searchPeriod}
                    onChange={handleSearchPeriodChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
                style={{ marginTop: '16px' }}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteAttendanceForPeriod(searchPeriod)}
                style={{ marginTop: '16px', marginLeft: '16px' }}
              >
                Delete Attendances for Period
              </Button>
              <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User ID</TableCell>
                      <TableCell>UID</TableCell>
                      <TableCell>Punch Status</TableCell>
                      <TableCell>Active Status</TableCell>
                      <TableCell>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAttendances.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(attendance => (
                      <AttendanceCard attendance={attendance} key={attendance._id} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredAttendances.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AttendanceManagement;
