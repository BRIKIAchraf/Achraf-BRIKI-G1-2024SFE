import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLeaves, revokeLeave } from '../../store/leaveSlice';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, MenuItem, AvatarGroup, Avatar, InputAdornment, Stack, Pagination, IconButton } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import SearchIcon from '@mui/icons-material/Search';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DeleteIcon from '@mui/icons-material/Delete';

const LeaveManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leaves, status, error } = useSelector((state) => state.leaves);

  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [leavesPerPage] = useState(3); // Number of leaves per page

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log('Fetched leaves:', leaves);
    }
  }, [leaves, status]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleTypeChange = (event) => {
    setLeaveTypeFilter(event.target.value);
    setPage(1); // Reset to first page on type change
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRevokeLeave = (leaveId) => {
    dispatch(revokeLeave(leaveId));
  };

  const filteredLeaves = leaves.filter(leave =>
    (leave.type.toLowerCase().includes(leaveTypeFilter.toLowerCase())) &&
    (leave.employee ? leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  console.log('Filtered leaves:', filteredLeaves);

  const paginatedLeaves = filteredLeaves.slice((page - 1) * leavesPerPage, page * leavesPerPage);

  return (
    <>
      <Breadcrumb title="Leave Management">
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="primary">Gestion de congé</Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by Employee"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Filter by Leave Type"
            variant="outlined"
            value={leaveTypeFilter}
            onChange={handleTypeChange}
            select
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="annual">Annual</MenuItem>
            <MenuItem value="sick">Sick</MenuItem>
            <MenuItem value="maternity">Maternity</MenuItem>
          </TextField>
        </Grid>
        {paginatedLeaves.length > 0 ? (
          paginatedLeaves.map((leave) => (
            <Grid key={leave._id} item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardHeader
                  title={<Typography component="div" variant="h6" sx={{ textAlign: 'center' }}>{leave.type}</Typography>}
                  subheader={leave.employee || 'No employee assigned'}
                  avatar={<ScheduleIcon />}
                  titleTypographyProps={{ align: 'center' }}
                  action={
                    <IconButton onClick={() => handleRevokeLeave(leave._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                />
                <Divider />
                <CardContent>
                  <Typography variant="body2">From: {new Date(leave.startDate).toLocaleDateString()}</Typography>
                  <Typography variant="body2">To: {new Date(leave.endDate).toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="subtitle1">No leaves match the specified criteria.</Typography>
          </Grid>
        )}
      </Grid>
      <Stack spacing={2} sx={{ alignItems: 'center', paddingY: 4 }}>
        <Pagination
          count={Math.ceil(filteredLeaves.length / leavesPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Stack>
    </>
  );
};

export default LeaveManagement;
