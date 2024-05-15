import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, TextField, MenuItem, AvatarGroup, Avatar, InputAdornment, Stack, Pagination } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import SearchIcon from '@mui/icons-material/Search';
import ScheduleIcon from '@mui/icons-material/Schedule';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [leavesPerPage] = useState(3); // Number of leaves per page
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data with unique IDs for each leave entry
    const mockLeaves = [
      // Include your mock data here
      {
        id: 1,
        type: 'Annual',
        status: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        employees: [
          { name: 'John Doe', department: 'HR', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', department: 'Marketing', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 2,
        type: 'Annual',
        status: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        employees: [
          { name: 'John Doe', department: 'HR', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', department: 'Marketing', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 3,
        type: 'Annual',
        status: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        employees: [
          { name: 'John Doe', department: 'HR', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', department: 'Marketing', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 4,
        type: 'Annual',
        status: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        employees: [
          { name: 'John Doe', department: 'HR', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', department: 'Marketing', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 5,
        type: 'Annual',
        status: 'Approved',
        startDate: '2023-01-01',
        endDate: '2023-01-10',
        employees: [
          { name: 'John Doe', department: 'HR', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', department: 'Marketing', avatar: 'https://via.placeholder.com/150' }
        ]
      },
    ];
    setLeaves(mockLeaves);
  }, []);

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

  const filteredLeaves = leaves.filter(leave =>
    leave.type.toLowerCase().includes(leaveTypeFilter.toLowerCase()) &&
    leave.employees.some(employee => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            <Grid key={leave.id} item xs={12} sm={6} md={4} lg={3} onClick={() => navigate(`/leave/${leave.id}`)} style={{ cursor: 'pointer' }}>
              <Card>
                <CardHeader
                  title={<Typography component="div" variant="h6" sx={{ textAlign: 'center' }}>{leave.type}</Typography>}
                  subheader={leave.employees.map(e => e.name).join(', ')}
                  avatar={<ScheduleIcon />}
                  titleTypographyProps={{ align: 'center' }}
                />
                <Divider />
                <CardContent>
                  <AvatarGroup max={4}>
                    {leave.employees.map((employee, index) => (
                      <Avatar key={index} alt={employee.name} src={employee.avatar} />
                    ))}
                  </AvatarGroup>
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
