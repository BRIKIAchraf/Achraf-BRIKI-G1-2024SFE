import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select,
  Typography, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import HistoryIcon from '@mui/icons-material/History';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { blue, deepPurple, green, red, yellow } from '@mui/material/colors';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { Rnd } from 'react-rnd';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfSize, setPdfSize] = useState({ width: '600px', height: '800px' });
  const [showPdf, setShowPdf] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`https://schoolomegup-api.onrender.com/api/employes/${id}`);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date) ? date.toISOString().split('T')[0] : 'Invalid Date';
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFillColor(100, 100, 255); // Light blue color
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Rapport d'employee", 14, 20);

    // Add footer
    doc.setFillColor(100, 100, 255); // Light blue color
    doc.rect(0, 277, 210, 20, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Page 1", 14, 288);
    doc.text("Generated on " + new Date().toLocaleDateString(), 150, 288);

    // Add employee details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Name: ${employeeData.nom} ${employeeData.prenom}`, 14, 40);
    doc.text(`Birthdate: ${formatDate(employeeData.date_naissance)}`, 14, 50);
    doc.text(`Login Method: ${employeeData.login_method}`, 14, 60);
    doc.text(`Department: ${employeeData.id_departement?.name}`, 14, 70);
    doc.text(`Planning: ${employeeData.id_planning?.name}`, 14, 80);

    // Add previous departments
    doc.addPage();
    doc.setFillColor(100, 100, 255); // Light blue color
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Rapport d'employee", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Previous Departments:', 14, 40);
    employeeData.previousDepartments?.forEach((dept, index) => {
      doc.text(`${dept.name} from ${dept.dateFrom} to ${dept.dateTo}`, 14, 50 + (10 * index));
    });

    // Add previous plannings
    doc.addPage();
    doc.setFillColor(100, 100, 255); // Light blue color
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Rapport d'employee", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Previous Plannings:', 14, 40);
    employeeData.previousPlannings?.forEach((plan, index) => {
      doc.text(`${plan.planName} from ${plan.dateFrom} to ${plan.dateTo}`, 14, 50 + (10 * index));
    });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setShowPdf(true);
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'EmployeeDetails.pdf';
    link.click();
  };

  const handleBackToList = () => {
    navigate('/sample-page');
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', p: 4, bgcolor: yellow[50] }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={showPdf ? 4 : 12}>
          <Box sx={{ width: '100%', bgcolor: blue[50], p: 2 }}>
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

            <Paper sx={{ p: 2, mb: 2, mt: 2, bgcolor: blue[50] }}>
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
                    type="date"
                    value={formatDate(employeeData.date_naissance)}
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
                  <Typography variant="subtitle1"><strong>Birthdate:</strong> {formatDate(employeeData.date_naissance)}</Typography>
                  <Typography variant="subtitle1"><strong>Nationality:</strong> {employeeData.nationality}</Typography>
                </>
              )}
            </Paper>

            <Paper sx={{ p: 2, mb: 2, bgcolor: green[50] }}>
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
                  <Typography variant="subtitle1"><strong>Planning:</strong> {employeeData.id_planning?.name}</Typography>
                  <Typography variant="subtitle1"><strong>Department:</strong> {employeeData.id_departement?.name}</Typography>
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

            <Paper sx={{ p: 2, mb: 2, bgcolor: red[50] }}>
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

            <Paper sx={{ p: 2, mb: 2, bgcolor: deepPurple[50] }}>
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
              onClick={handleGeneratePDF}
              sx={{ mb: 2 }}
            >
              Generate PDF Preview
            </Button>

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToList}
              sx={{ mb: 2 }}
            >
              Back to Employee List
            </Button>
          </Box>
        </Grid>
        {showPdf && (
          <Grid item xs={12} md={8}>
            <Rnd
              size={{ width: pdfSize.width, height: pdfSize.height }}
              onResizeStop={(e, direction, ref, delta, position) => {
                setPdfSize({
                  width: ref.style.width,
                  height: ref.style.height,
                });
              }}
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            >
              <Box sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <iframe src={pdfUrl} width="100%" height="100%" title="PDF Preview" />
              </Box>
            </Rnd>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadPDF}
              sx={{ mt: 2 }}
            >
              Download PDF
            </Button>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { /* Your delete handler logic */ }} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EmployeeDetails;
