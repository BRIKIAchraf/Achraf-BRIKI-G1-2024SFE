import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody,
  TableRow, TableCell, Checkbox, IconButton, TextField, MenuItem, Button, Box, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination, Select,
  FormControl, InputLabel, InputAdornment, Avatar, Snackbar, Alert, Toolbar
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { fetchEmployees, createEmployee, deleteEmployee } from '../../store/employeeSlice';
import { jsPDF } from 'jspdf'; // Import jsPDF

const primaryColor = '#388e3c';

const SamplePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, status, error } = useSelector((state) => state.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchLoginMethod, setSearchLoginMethod] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteEmployeeIds, setDeleteEmployeeIds] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    login_method: '',
    department: '',
    picture: ''
  });
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    console.log("Employees:", employees);
    console.log("Status:", status);
    console.log("Error:", error);
  }, [employees, status, error]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchDepartmentChange = (event) => {
    setSearchDepartment(event.target.value);
  };

  const handleSearchLoginMethodChange = (event) => {
    setSearchLoginMethod(event.target.value);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    dispatch(createEmployee(newEmployee));
    setOpenAddDialog(false);
    setSnackbarOpen(true);
  };

  const handleSelectEmployee = (id) => {
    setDeleteEmployeeIds(prev => prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]);
  };

  const handleDeleteSelected = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDeleteEmployee = () => {
    deleteEmployeeIds.forEach(id => {
      dispatch(deleteEmployee(id));
    });
    setOpenDeleteDialog(false);
    setSnackbarOpen(true);
  };

  const handleGeneratePDF = (employee) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    // Add header
    doc.setFillColor(100, 100, 255);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Rapport d'employee", 40, 20);

    // Add employee details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(230, 230, 250);
    doc.rect(14, 40, 182, 60, 'FD');

    doc.setTextColor(0, 0, 0);
    doc.text('Employee Details', 14, 50);
    doc.setFontSize(10);
    const birthdate = new Date(employee.date_naissance);
    const validBirthdate = !isNaN(birthdate);
    doc.text(`Name: ${employee.nom} ${employee.prenom}`, 14, 60);
    doc.text(`Birthdate: ${validBirthdate ? birthdate.toLocaleDateString() : 'Invalid Date'}`, 14, 70);
    doc.text(`Login Method: ${employee.login_method}`, 14, 80);
    doc.text(`Department: ${employee.id_departement?.name || 'N/A'}`, 14, 90);

    // Add footer
    doc.setFillColor(100, 100, 255);
    doc.rect(0, pageHeight - 20, 210, 20, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Page 1", 14, pageHeight - 10);
    doc.text("Generated on " + new Date().toLocaleDateString(), 150, pageHeight - 10);

    doc.save(`EmployeeDetails_${employee.nom}_${employee.prenom}.pdf`);
  };

  const handleGenerateAllPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let yPosition = 20;
    let itemsPerPage = 4; // Adjust this number as needed
    let currentPage = 1;

    // Add header for the first page
    doc.setFillColor(100, 100, 255);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("Rapport des employés", pageWidth / 2 - 40, 20);

    employees.forEach((employee, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = 20;
        currentPage++;

        // Add header for new page
        doc.setFillColor(100, 100, 255);
        doc.rect(0, 0, pageWidth, 30, 'F');
        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.text("Rapport des employés", pageWidth / 2 - 40, 20);
      }

      yPosition += 10;

      // Add employee details
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(230, 230, 250);
      doc.rect(14, yPosition, 182, 60, 'FD');

      doc.setTextColor(0, 0, 0);
      doc.text(`Employee Details (${index + 1})`, 14, yPosition + 10);
      doc.setFontSize(10);
      const birthdate = new Date(employee.date_naissance);
      const validBirthdate = !isNaN(birthdate);
      doc.text(`Name: ${employee.nom} ${employee.prenom}`, 14, yPosition + 20);
      doc.text(`Birthdate: ${validBirthdate ? birthdate.toLocaleDateString() : 'Invalid Date'}`, 14, yPosition + 30);
      doc.text(`Login Method: ${employee.login_method}`, 14, yPosition + 40);
      doc.text(`Department: ${employee.id_departement?.name || 'N/A'}`, 14, yPosition + 50);

      yPosition += 70; // Space between each employee block
    });

    // Add footer to the last page
    doc.setFillColor(100, 100, 255);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(`Page ${currentPage}`, 14, pageHeight - 10);
    doc.text("Generated on " + new Date().toLocaleDateString(), pageWidth - 60, pageHeight - 10);

    doc.save('EmployeesReport.pdf');
  };

  const filteredEmployees = Array.isArray(employees) ? employees.filter(employee =>
    (employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchDepartment ? employee.id_departement?.name === searchDepartment : true) &&
    (searchLoginMethod ? employee.login_method === searchLoginMethod : true)
  ) : [];

  console.log("Filtered Employees:", filteredEmployees);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  return (
    <>
      <Box sx={{ padding: '8px 16px', margin: '16px', backgroundColor: '#F7F7F7', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            <Link to="/">Acceuille</Link>
          </Typography>
          <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Gestion de Employee
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Toolbar sx={{ justifyContent: 'space-between', backgroundColor: primaryColor, borderRadius: '4px', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Gestion d'employes</Typography>
            <Box>
              <Button variant="contained" startIcon={<PictureAsPdfIcon />} onClick={handleGenerateAllPDF} sx={{ backgroundColor: 'white', color: primaryColor, '&:hover': { backgroundColor: '#f0f0f0' }, ml: 2 }}>
                Télécharger PDF
              </Button>
              <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleDeleteSelected} sx={{ backgroundColor: 'white', color: primaryColor, '&:hover': { backgroundColor: '#f0f0f0' }, ml: 2 }}>
                Supprimer
              </Button>
            </Box>
          </Toolbar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Name"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ backgroundColor: 'white', borderRadius: '4px', '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: primaryColor }, '&:hover fieldset': { borderColor: primaryColor }, '&.Mui-focused fieldset': { borderColor: primaryColor } } }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Departement</InputLabel>
            <Select
              value={searchDepartment}
              onChange={handleSearchDepartmentChange}
              label="Department"
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Methode de pointage</InputLabel>
            <Select
              value={searchLoginMethod}
              onChange={handleSearchLoginMethodChange}
              label="Login Method"
              sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="PassOrFingerOrCard">PassOrFingerOrCard</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="FingerAndPass">FingerAndPass</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Employee List" sx={{ backgroundColor: primaryColor, color: 'white' }} />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={deleteEmployeeIds.length > 0 && deleteEmployeeIds.length < filteredEmployees.length}
                        checked={filteredEmployees.length > 0 && deleteEmployeeIds.length === filteredEmployees.length}
                        onChange={(event) => setDeleteEmployeeIds(event.target.checked ? filteredEmployees.map((employee) => employee._id) : [])}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>Photos</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prenom</TableCell>
                    <TableCell>Date de Naissance</TableCell>
                    <TableCell>Login Method</TableCell>
                    <TableCell>Departement</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((employee) => (
                      <TableRow key={employee._id} hover style={{ cursor: 'pointer' }}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={deleteEmployeeIds.includes(employee._id)}
                            onChange={() => handleSelectEmployee(employee._id)}
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>
                          <Avatar src={employee.picture} alt={`${employee.prenom} ${employee.nom}`} />
                        </TableCell>
                        <TableCell>{employee.nom}</TableCell>
                        <TableCell>{employee.prenom}</TableCell>
                        <TableCell>{employee.date_naissance ? new Date(employee.date_naissance).toLocaleDateString() : 'N/A'}</TableCell> {/* Ensure valid date format */}
                        <TableCell>{employee.login_method}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => navigate(`/sample-page/employee-details/${employee._id}`)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="primary" onClick={() => handleGeneratePDF(employee)}>
                            <PictureAsPdfIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">Aucun employé</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Pagination
            count={Math.ceil(filteredEmployees.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      </Grid>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Ajouter un nouvel employé</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="nom" label="Nom" type="text" fullWidth value={newEmployee.nom} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }} />
          <TextField margin="dense" name="prenom" label="Prénom" type="text" fullWidth value={newEmployee.prenom} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }} />
          <TextField margin="dense" name="date_naissance" label="Date de Naissance" type="date" fullWidth value={newEmployee.date_naissance} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }} />
          <TextField select margin="dense" name="login_method" label="Méthode de Connexion" fullWidth value={newEmployee.login_method} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}>
            <MenuItem value="PassOrFingerOrCard">PassOrFingerOrCard</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="FingerAndPass">FingerAndPass</MenuItem>
          </TextField>
          <TextField margin="dense" name="department" label="Department" type="text" fullWidth value={newEmployee.department} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }} />
          <TextField margin="dense" name="picture" label="Picture URL" type="text" fullWidth value={newEmployee.picture} onChange={handleFieldChange} sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '4px' } }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">Sortir</Button>
          <Button onClick={handleAddEmployee} color="primary">Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vous êtes sûr de supprimer cet employé(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Sortir
          </Button>
          <Button onClick={confirmDeleteEmployee} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Action terminée avec succès!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SamplePage;
