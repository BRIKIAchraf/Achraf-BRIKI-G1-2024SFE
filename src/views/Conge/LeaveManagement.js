import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, IconButton, Box, AvatarGroup, Avatar } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LeaveDetails from './LeaveDetails';
const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Updated mock data with placeholder images
    const mockLeaves = [
      {
        id: 1,
        type: 'Annual',
        employees: [
          { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' }
        ]
      },

      {
        id: 1,
        type: 'Annual',
        employees: [
          { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 1,
        type: 'Annual',
        employees: [
          { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 1,
        type: 'Annual',
        employees: [
          { name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' }
        ]
      },
      {
        id: 2,
        type: 'Sick',
        employees: [
          { name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' },
          { name: 'Emily Rae', avatar: 'https://via.placeholder.com/150' }
        ]
      }
    ];
    setLeaves(mockLeaves);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLeaves = leaves.filter(leave =>
    leave.employees.some(employee => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      {filteredLeaves.map((leave) => (
        <Grid key={leave.id} item xs={12} sm={6} md={4} lg={3} onClick={() => navigate(`/leave/${leave.id}`)}>
          <Card>
            <CardHeader
              title={<Typography component="div" variant="h6">{leave.type}</Typography>}
              subheader={leave.employees.map(e => e.name).join(', ')}
              avatar={<ScheduleIcon />}
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
      ))}
    </Grid>
    <Routes>
        <Route path=":leaveId" element={<LeaveDetails leaves={leaves} />} />
      </Routes>
  </>
);
};


export default LeaveManagement;
