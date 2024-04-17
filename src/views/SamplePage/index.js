import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const SamplePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    login_method: '',
    type: ''
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockUsers = [
      { id: 1, nom: 'Doe', prenom: 'John', date_naissance: '1990-01-01', login_method: 'PassOrFingerOrCard', type: 'Type A', verified: true },
      { id: 2, nom: 'Smith', prenom: 'Jane', date_naissance: '1995-05-05', login_method: 'Card', type: 'Type B', verified: false }
    ];
    setUsers(mockUsers);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    // Handle logic to add a new employee
    // For demonstration, let's just log the new employee details
    console.log('New Employee:', newEmployee);
    setOpenAddDialog(false); // Close the dialog after adding
    // Add your logic here to send the new employee data to your API or perform any other actions
  };

  return (
    <>
      <Breadcrumb title="Sample Page">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          gestion de employee
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} align="right">
          <Box mb={2}>
            <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
              Add New Employee
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" className="card-header">
                  Employee List
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vérifié</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Date de Naissance</TableCell>
                    <TableCell>Méthode de Connexion</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox checked={user.verified} disabled />
                      </TableCell>
                      <TableCell>{user.nom}</TableCell>
                      <TableCell>{user.prenom}</TableCell>
                      <TableCell>{user.date_naissance}</TableCell>
                      <TableCell>{user.login_method}</TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="info">
                          <PictureAsPdfIcon />
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
      {/* Add Employee Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details of the employee:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nom"
            name="nom"
            label="Nom"
            type="text"
            fullWidth
            value={newEmployee.nom}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            id="prenom"
            name="prenom"
            label="Prénom"
            type="text"
            fullWidth
            value={newEmployee.prenom}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            id="date_naissance"
            name="date_naissance"
            label="Date de Naissance"
            type="date"
            fullWidth
            value={newEmployee.date_naissance}
            onChange={handleFieldChange}
          />
          <TextField
            select
            margin="dense"
            id="login_method"
            name="login_method"
            label="Méthode de Connexion"
            fullWidth
            value={newEmployee.login_method}
            onChange={handleFieldChange}
          >
            <MenuItem value="PassOrFingerOrCard">PassOrFingerOrCard</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="FingerAndPass">FingerAndPass</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="type"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={newEmployee.type}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SamplePage;
