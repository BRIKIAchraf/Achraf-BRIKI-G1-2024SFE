import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead, TableBody,
  TableRow, TableCell, Checkbox, IconButton, TextField, MenuItem, Button, Box, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination, Select,
  FormControl, InputLabel, InputAdornment, Avatar
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { fetchAllEmployees, createEmployee, deleteEmployee } from '../../store/employeeSlice';

const primaryColor = '#1976d2';

const SamplePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employees.employees);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    login_method: '',
    type: ''
  });
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    dispatch(createEmployee(newEmployee));
    setOpenAddDialog(false);
  };

  const handleDeleteSelected = (id) => {
    dispatch(deleteEmployee(id));
  };

  const filteredEmployees = employees.filter(employee =>
    employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1); // Reset page to 1 when changing items per page
  };

  return (
    <>
      <Box sx={{ padding: '8px 16px', margin: '16px', backgroundColor: '#F7F7F7', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '4px' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            <Link to="/">Home</Link>
          </Typography>
          <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Gestion de Employee
          </Typography>
        </Breadcrumbs>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
            Add New Employee
          </Button>
          <Button variant="contained" startIcon={<DeleteIcon />} sx={{ ml: 2 }} onClick={() => handleDeleteSelected()}>
            Delete Selected
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Employee List" />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Login Method</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.nom}</TableCell>
                      <TableCell>{employee.prenom}</TableCell>
                      <TableCell>{employee.date_naissance}</TableCell>
                      <TableCell>{employee.login_method}</TableCell>
                      <TableCell>{employee.type}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDeleteSelected(employee.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                        <IconButton>
                          <PictureAsPdfIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
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
          />
        </Grid>
      </Grid>

      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="nom" label="Nom" type="text" fullWidth value={newEmployee.nom} onChange={handleFieldChange} />
          <TextField margin="dense" name="prenom" label="Prénom" type="text" fullWidth value={newEmployee.prenom} onChange={handleFieldChange} />
          <TextField margin="dense" name="date_naissance" label="Date de Naissance" type="date" fullWidth value={newEmployee.date_naissance} onChange={handleFieldChange} />
          <TextField select margin="dense" name="login_method" label="Méthode de Connexion" fullWidth value={newEmployee.login_method} onChange={handleFieldChange}>
            <MenuItem value="PassOrFingerOrCard">PassOrFingerOrCard</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="FingerAndPass">FingerAndPass</MenuItem>
          </TextField>
          <TextField margin="dense" name="type" label="Type" type="text" fullWidth value={newEmployee.type} onChange={handleFieldChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEmployee}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SamplePage;
