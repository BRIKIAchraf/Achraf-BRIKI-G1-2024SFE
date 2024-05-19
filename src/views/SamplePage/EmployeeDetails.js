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
import axios from 'axios'; // Import axios for API calls

const EmployeeDetails = () => {
  const { id } = useParams(); // Get the employee ID from the route params
  const [employeeData, setEmployeeData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employes/${id}`); // Replace with your actual API endpoint
        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [id]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Name: ${employeeData.nom} ${employeeData.prenom}`, 10, 10);
    doc.text(`Birthdate: ${employeeData.date_naissance}`, 10, 20);
    doc.text(`Login Method: ${employeeData.login_method}`, 10, 30);
    doc.text(`Department: ${employeeData.id_departement?.name}`, 10, 40);
    doc.text(`Planning: ${employeeData.id_planning?.name}`, 10, 50);
    doc.addPage();
    doc.text('Previous Departments:', 10, 10);
    employeeData.previousDepartments?.forEach((dept, index) => {
      doc.text(`${dept.name} from ${dept.dateFrom} to ${dept.dateTo}`, 10, 20 + (10 * index));
    });
    doc.addPage();
    doc.text('Previous Plannings:', 10, 10);
    employeeData.previousPlannings?.forEach((plan, index) => {
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
            <TextField variant="outlined" value={employeeData.nom} onChange={handleInputChange} name="nom" sx={{ mt: 2 }} />
          ) : (
            <Typography variant="h5" sx={{ color: deepPurple[500], mt: 2, fontWeight: 'bold' }}>
              <AccountCircleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{employeeData.nom} {employeeData.prenom}
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
                name="date_naissance"
                value={employeeData.date_naissance}
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
              <Typography variant="subtitle1"><strong>Birthdate:</strong> {employeeData.date_naissance}</Typography>
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
                name="id_planning"
                value={employeeData.id_planning?.name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Department ID"
                variant="outlined"
                fullWidth
                name="id_departement"
                value={employeeData.id_departement?.name}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <Typography variant="subtitle1"><strong>Type:</strong> {employeeData.type}</Typography>
              <Typography variant="subtitle1"><strong>Planning ID:</strong> {employeeData.id_planning?.name}</Typography>
              <Typography variant="subtitle1"><strong>Department ID:</strong> {employeeData.id_departement?.name}</Typography>
            </>
          )}
          {editMode ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Login Method</InputLabel>
              <Select
                value={employeeData.login_method}
                onChange={handleInputChange}
                label="Login Method"
                name="login_method"
              >
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Fingerprint">Fingerprint</MenuItem>
                <MenuItem value="Card and Password">Card and Password</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography sx={{ mt: 2 }}>{`Login Method: ${employeeData.login_method}`}</Typography>
          )}
        </Paper>

        <Paper sx={{ p: 2, mb: 2, width: '100%', bgcolor: red[50] }}>
          <Typography variant="h6" sx={{ color: red[800], mb: 1, fontWeight: 'bold' }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />Work History
          </Typography>
          <Grid container spacing={2}>
            {employeeData.previousDepartments?.map((dept, index) => (
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
            {employeeData.previousPlannings?.map((plan, index) => (
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
};

export default EmployeeDetails;
