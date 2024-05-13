import React, { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Chip, Grid, IconButton, List, ListItem, ListItemText, Typography, InputAdornment, Divider, Avatar, TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { blue, green, red, yellow, grey, purple, orange } from '@mui/material/colors';

const mockData = {
  employees: [
    { id: 1, name: "John Doe", department: "Marketing", leaveStart: "2021-09-10", leaveEnd: "2021-09-15", avatar: "https://via.placeholder.com/150" },
    { id: 2, name: "Jane Smith", department: "Sales", leaveStart: "2021-09-12", leaveEnd: "2021-09-16", avatar: "https://via.placeholder.com/150" },
    { id: 3, name: "Alice Johnson", department: "HR", leaveStart: "2021-09-11", leaveEnd: "2021-09-17", avatar: "https://via.placeholder.com/150" },
    { id: 4, name: "Mark Brown", department: "Operations", leaveStart: "2021-09-14", leaveEnd: "2021-09-18", avatar: "https://via.placeholder.com/150" }
  ],
  departmentLeaveCounts: {
    Marketing: 2,
    Sales: 1,
    HR: 1,
    Operations: 1
  }
};

// Define colors for each department
const departmentColors = {
  Marketing: purple[400],
  Sales: orange[400],
  HR: green[400],
  Operations: blue[400]
};

export default function LeaveDetails() {
  const [filter, setFilter] = useState('');
  const [employees, setEmployees] = useState(mockData.employees);
  const [editMode, setEditMode] = useState({});

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleEdit = (id) => {
    setEditMode({ ...editMode, [id]: true });
  };

  const handleSave = (id) => {
    const updatedEmployee = {
      name: document.getElementById(`name-${id}`).value,
      department: document.getElementById(`department-${id}`).value,
      leaveStart: document.getElementById(`leaveStart-${id}`).value,
      leaveEnd: document.getElementById(`leaveEnd-${id}`).value
    };
    setEmployees(
      employees.map(employee =>
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
      )
    );
    setEditMode({ ...editMode, [id]: false });
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
            <Chip key={index} label={`${department}: ${count} on leave`} sx={{ mr: 1, fontSize: '1rem', height: 'auto', padding: '10px 0', backgroundColor: departmentColors[department], color: 'white' }} icon={<PeopleIcon />} />
          ))}
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        {filteredEmployees.map((employee, index) => (
          <Grid key={employee.id} item xs={12} md={6}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: blue[800], fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ mr: 1, color: blue[500] }} />{employee.name} - Leave Details
                  <IconButton onClick={() => handleDelete(employee.id)} color="error" sx={{ marginLeft: 'auto' }}>
                    <DeleteIcon />
                  </IconButton>
                  {!editMode[employee.id] && (
                    <IconButton onClick={() => handleEdit(employee.id)} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                </Typography>
                <List sx={{ maxHeight: 300, overflow: 'auto', borderRadius: 2 }}>
                  <ListItem>
                    <Avatar alt={employee.name} src={employee.avatar} sx={{ width: 60, height: 60, marginRight: 2 }} />
                    {editMode[employee.id] ? (
                      <ListItemText primary={<TextField id={`name-${employee.id}`} defaultValue={employee.name} />} secondary={<TextField id={`department-${employee.id}`} defaultValue={employee.department} />} />
                    ) : (
                      <ListItemText primary={<Typography variant="h5" color="primary">{employee.name}</Typography>} secondary={`Department: ${employee.department}`} />
                    )}
                    <ListItemText secondary={
                      <>
                        {editMode[employee.id] ? (
                          <>
                            <TextField id={`leaveStart-${employee.id}`} defaultValue={employee.leaveStart} />
                            <ArrowRightAltIcon />
                            <TextField id={`leaveEnd-${employee.id}`} defaultValue={employee.leaveEnd} />
                          </>
                        ) : (
                          <Typography variant="subtitle1">From: {employee.leaveStart} <ArrowRightAltIcon /> To: {employee.leaveEnd}</Typography>
                        )}
                      </>
                    } />
                  </ListItem>
                  <Divider />
                  <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTimeIcon sx={{ color: yellow[800], mr: 1 }} />
                      {editMode[employee.id] ? (
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                          <TextField id={`name-${employee.id}`} defaultValue={employee.name} />
                          <ArrowRightAltIcon />
                          <TextField id={`leaveStart-${employee.id}`} defaultValue={employee.leaveStart} />
                          <ArrowRightAltIcon />
                          <TextField id={`leaveEnd-${employee.id}`} defaultValue={employee.leaveEnd} />
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 'medium', display: 'flex', alignItems: 'center' }}>
                          {employee.name} - {employee.leaveStart} <ArrowRightAltIcon /> {employee.leaveEnd}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      {editMode[employee.id] && (
                        <IconButton onClick={() => handleSave(employee.id)} color="primary">
                          <SaveIcon />
                        </IconButton>
                      )}
                    </Box>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
