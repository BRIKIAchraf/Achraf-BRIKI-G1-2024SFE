import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendances } from '../../store/attendanceSlice';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Paper, TextField, MenuItem, Button, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const AttendanceCard = ({ attendance }) => {
  const punchStatus = attendance.punch === 0 ? "Missing" : "Completed";
  const activeStatus = attendance.status === 1 ? "Active" : "Inactive";
  const formattedDate = new Date(attendance.timestamp).toLocaleString();

  return (
    <TableRow key={attendance._id}>
      <TableCell>{attendance.firstName}</TableCell>
      <TableCell>{attendance.lastName}</TableCell>
      <TableCell>{attendance.login_method}</TableCell>
      <TableCell>{attendance.department}</TableCell>
      <TableCell>{punchStatus}</TableCell>
      <TableCell>{activeStatus}</TableCell>
      <TableCell>{formattedDate}</TableCell>
    </TableRow>
  );
};

const departments = ['Department A', 'Department B', 'Department C'];

const AttendanceManagement = () => {
  const dispatch = useDispatch();
  const { attendances, status, error } = useSelector((state) => state.attendances);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchName, setSearchName] = useState('');
  const [searchTime, setSearchTime] = useState(null);
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAttendances());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setFilteredAttendances(attendances);
    }
  }, [attendances, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    filterAttendances(searchName, searchTime, searchDepartment, searchStartDate, searchEndDate);
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

  const handleSearchStartDateChange = (date) => {
    setSearchStartDate(date);
  };

  const handleSearchEndDateChange = (date) => {
    setSearchEndDate(date);
  };

  const handleDeleteAttendanceForPeriod = (startDate, endDate) => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAttendanceForPeriod = () => {
    console.log(`Deleting attendances from ${searchStartDate} to ${searchEndDate}`);
    setDeleteDialogOpen(false);
  };

  const deleteAttendancesForCurrentMonth = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
    handleDeleteAttendanceForPeriod(startDate, endDate);
  };

  const deleteAttendancesForCurrentYear = () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), 0, 1);
    const endDate = new Date(now.getFullYear(), 11, 31);

    setSearchStartDate(startDate);
    setSearchEndDate(endDate);
    handleDeleteAttendanceForPeriod(startDate, endDate);
  };

  const filterAttendances = (name, time, department, startDate, endDate) => {
    let filtered = attendances.filter(attendance => {
      const attendanceDate = new Date(attendance.timestamp);
      return (
        (attendance.firstName.toLowerCase().includes(name.toLowerCase()) ||
          attendance.lastName.toLowerCase().includes(name.toLowerCase())) &&
        attendance.department.toLowerCase().includes(department.toLowerCase()) &&
        (!startDate || attendanceDate >= startDate) &&
        (!endDate || attendanceDate <= endDate)
      );
    });
    setFilteredAttendances(filtered);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    value={searchTime}
                    onChange={handleSearchTimeChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
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
                    label="Search Start Date"
                    value={searchStartDate}
                    onChange={handleSearchStartDateChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <DatePicker
                    label="Search End Date"
                    value={searchEndDate}
                    onChange={handleSearchEndDateChange}
                    renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
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
                onClick={deleteAttendancesForCurrentMonth}
                style={{ marginTop: '16px', marginLeft: '16px' }}
              >
                Delete Attendances for Current Month
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={deleteAttendancesForCurrentYear}
                style={{ marginTop: '16px', marginLeft: '16px' }}
              >
                Delete Attendances for Current Year
              </Button>
              <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Login Method</TableCell>
                      <TableCell>Department</TableCell>
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the attendances for the selected period?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteAttendanceForPeriod} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AttendanceManagement;
