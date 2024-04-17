import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button, Box, TextField } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data for demonstration
    const mockLeaves = [
      { id: 1, employee: 'John Doe', startDate: '2024-04-01', endDate: '2024-04-05', type: 'Annual', status: 'approved' },
      { id: 2, employee: 'Jane Smith', startDate: '2024-04-10', endDate: '2024-04-12', type: 'Sick', status: 'pending' }
    ];
    setLeaves(mockLeaves);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLeaves = leaves.filter(leave => {
    return leave.employee.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <Breadcrumb title="Leave Management">
        <Typography variant="subtitle2" color="inherit">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          gestion de congé
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Leave List
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <TextField
                label="Search Employee"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ mb: 2 }}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLeaves.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.employee}</TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>{leave.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default LeaveManagement;
