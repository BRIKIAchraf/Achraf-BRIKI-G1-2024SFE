import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Typography, Box, TextField } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HistoryIcon from '@mui/icons-material/History';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { blue, deepPurple, green, red, yellow } from '@mui/material/colors';
import { jsPDF } from 'jspdf';

// Mock data (replace with your actual data fetching logic)
const mockEmployees = [
  {
    id: 1,
    fullName: 'John Doe',
    birthdate: '1990-01-01',
    nationality: 'American',
    userID: 'user123',
    type: 'Full-time',
    planningID: 'plan123',
    departmentID: 'dept123',
    loginMethod: 'Card',
    previousDepartments: [
      { name: 'Marketing', dateFrom: 'January 2019', dateTo: 'December 2019' },
      { name: 'Sales', dateFrom: 'January 2020', dateTo: 'December 2020' }
    ],
    previousPlannings: [
      { planName: 'Q1 Marketing Campaign', dateFrom: 'January 2019', dateTo: 'March 2019' },
      { planName: 'Sales Boost 2020', dateFrom: 'January 2020', dateTo: 'March 2020' }
    ],
    picture: 'https://via.placeholder.com/150'
  },
  // Add more mock employees here
];

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const employee = mockEmployees.find(emp => emp.id === parseInt(id));
    setEmployeeData(employee);
  }, [id]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Name: ${employeeData.fullName}`, 10, 10);
    doc.text(`Birthdate: ${employeeData.birthdate}`, 10, 20);
    doc.text(`Nationality: ${employeeData.nationality}`, 10, 30);
    doc.text(`User ID: ${employeeData.userID}`, 10, 40);
    doc.text(`Type: ${employeeData.type}`, 10, 50);
    doc.text(`Planning ID: ${employeeData.planningID}`, 10, 60);
    doc.text(`Department ID: ${employeeData.departmentID}`, 10, 70);
    doc.text(`Login Method: ${employeeData.loginMethod}`, 10, 80);
    doc.addPage();
    doc.text('Previous Departments:', 10, 10);
    employeeData.previousDepartments.forEach((dept, index) => {
      doc.text(`${dept.name} from ${dept.dateFrom} to ${dept.dateTo}`, 10, 20 + (10 * index));
    });
    doc.addPage();
    doc.text('Previous Plannings:', 10, 10);
    employeeData.previousPlannings.forEach((plan, index) => {
      doc.text(`${plan.planName} from ${plan.dateFrom} to ${plan.dateTo}`, 10, 20 + (10 * index));
    });
    doc.save('EmployeeDetails.pdf');
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ maxWidth: 960, margin: 'auto', overflow: 'hidden', p: 4, bgcolor: yellow[50] }}>
      <Grid container spacing={2} sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: '3px solid',
              borderColor: deepPurple[500]
            }}
            src={employeeData.picture}
          />
          {editMode ? (
            <TextField variant="outlined" value={employeeData.fullName} onChange={handleInputChange} name="fullName" sx={{ mt: 2 }} />
          ) : (
            <Typography variant="h5" sx={{ color: deepPurple[500], mt: 2, fontWeight: 'bold' }}>
              <AccountCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{employeeData.fullName}
            </Typography>
          )}
          <IconButton onClick={handleEditToggle} color="primary">{editMode ? <SaveIcon /> : <EditIcon />}</IconButton>
        </Grid>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: blue[50] }}>
          <Typography variant="h6" sx={{ color: blue[800], mb: 1, fontWeight: 'bold' }}>
            <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Personal Details
          </Typography>
          {editMode ? (
            <>
              <TextField
                label="Birthdate"
                variant="outlined"
                fullWidth
                name="birthdate"
                value={employeeData.birthdate}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Nationality"
                variant="outlined"
                fullWidth
                name="nationality"
                value={employeeData.nationality}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1"><strong>Birthdate:</strong> {employeeData.birthdate}</Typography>
              <Typography variant="subtitle1"><strong>Nationality:</strong> {employeeData.nationality}</Typography>
            </>
          )}
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: green[50] }}>
          <Typography variant="h6" sx={{ color: green[800], mb: 1, fontWeight: 'bold' }}>
            <WorkIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Professional Details
          </Typography>
          {editMode ? (
            <>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                name="type"
                value={employeeData.type}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Planning ID"
                variant="outlined"
                fullWidth
                name="planningID"
                value={employeeData.planningID}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Department ID"
                variant="outlined"
                fullWidth
                name="departmentID"
                value={employeeData.departmentID}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1"><strong>Type:</strong> {employeeData.type}</Typography>
              <Typography variant="subtitle1"><strong>Planning ID:</strong> {employeeData.planningID}</Typography>
              <Typography variant="subtitle1"><strong>Department ID:</strong> {employeeData.departmentID}</Typography>
            </>
          )}
          {editMode ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Login Method</InputLabel>
              <Select
                value={employeeData.loginMethod}
                onChange={handleInputChange}
                label="Login Method"
                name="loginMethod"
              >
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Fingerprint">Fingerprint</MenuItem>
                <MenuItem value="Card and Password">Card and Password</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography sx={{ mt: 2 }}>{`Login Method: ${employeeData.loginMethod}`}</Typography>
          )}
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: red[50] }}>
          <Typography variant="h6" sx={{ color: red[800], mb: 1, fontWeight: 'bold' }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Work History
          </Typography>
          <Grid container spacing={2}>
            {employeeData.previousDepartments.map((dept, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="subtitle1">
                  <strong>{dept.name}:</strong> {dept.dateFrom} to {dept.dateTo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: deepPurple[50] }}>
          <Typography variant="h6" sx={{ color: deepPurple[800], mb: 1, fontWeight: 'bold' }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Previous Plannings
          </Typography>
          <Grid container spacing={2}>
            {employeeData.previousPlannings.map((plan, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography variant="subtitle1">
                  <strong>{plan.planName}:</strong> {plan.dateFrom} to {plan.dateTo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
          sx={{ mb: 2 }}
        >
          Download PDF
        </Button>
      </Grid>
    </Paper>
  );
}
