import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Chip, Grid, IconButton, List, ListItem, ListItemText, TextField, Typography, InputAdornment, Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { blue, green, red, yellow, grey } from '@mui/material/colors';

const mockData = {
  employees: [
    { id: 1, name: "John Doe", department: "Marketing", leaveStart: "2021-09-10", leaveEnd: "2021-09-15" },
    { id: 2, name: "Jane Smith", department: "Sales", leaveStart: "2021-09-12", leaveEnd: "2021-09-16" },
    { id: 3, name: "Alice Johnson", department: "HR", leaveStart: "2021-09-11", leaveEnd: "2021-09-17" },
    { id: 4, name: "Mark Brown", department: "Marketing", leaveStart: "2021-09-14", leaveEnd: "2021-09-18" }
  ],
  departmentLeaveCounts: {
    Marketing: 2,
    Sales: 1,
    HR: 1
  }
};

export default function LeaveDetails() {
  const [filter, setFilter] = useState('');
  const [employees, setEmployees] = useState(mockData.employees);

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const filteredEmployees = useMemo(() => 
    employees.filter(employee =>
      employee.name.toLowerCase().includes(filter.toLowerCase()) ||
      employee.department.toLowerCase().includes(filter.toLowerCase())
    ), [filter, employees]);

  const filteredDepartmentCounts = useMemo(() => {
    const counts = {};
    filteredEmployees.forEach(emp => {
      counts[emp.department] = (counts[emp.department] || 0) + 1;
    });
    return counts;
  }, [filteredEmployees]);

  return (
    <Box sx={{ p: 3 }}>
      <TextField
  fullWidth
  label="Search by name or department"
  variant="outlined"
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  sx={{
    mb: 3,
    borderRadius: '50px',
    boxShadow: 3,
    backgroundColor: grey[50],
    '& .MuiOutlinedInput-root': {
      border: 'none', // Disable border
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none', // Disable border on hover
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none', // Disable border when not focused
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ color: blue[500] }} />
      </InputAdornment>
    ),
  }}
/>
      <Card sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', overflowX: 'auto', py: 1 }}>
          <Typography variant="h6" sx={{ color: red[800], fontWeight: 'bold', flexShrink: 0, mr: 2 }}>
            <BusinessIcon sx={{ color: red[500], mr: 1 }} />Department Leave Count
          </Typography>
          {Object.entries(filteredDepartmentCounts).map(([department, count], index) => (
            <Chip key={index} label={`${department}: ${count} on leave`} sx={{ mr: 1, fontSize: '1rem', height: 'auto', padding: '10px 0', backgroundColor: red[400], color: 'white' }} icon={<PeopleIcon />} />
          ))}
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: blue[800], fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ mr: 1, color: blue[500] }} />Employee Leave Details
              </Typography>
              <List sx={{ maxHeight: 300, overflow: 'auto', borderRadius: 2 }}>
                {filteredEmployees.map((employee, index) => (
                  <React.Fragment key={employee.id}>
                    <ListItem>
                      <ListItemText primary={employee.name} secondary={`Department: ${employee.department}`} />
                    </ListItem>
                    {index < filteredEmployees.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: green[800], fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 1, color: green[500] }} />Leave Duration
              </Typography>
              <List>
                {filteredEmployees.map((employee, index) => (
                  <ListItem key={employee.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: yellow[800], mr: 1 }} />
                      <Typography sx={{ fontSize: '1.2rem', fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                        {employee.name} - {employee.leaveStart} <ArrowRightAltIcon /> {employee.leaveEnd}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleDelete(employee.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
