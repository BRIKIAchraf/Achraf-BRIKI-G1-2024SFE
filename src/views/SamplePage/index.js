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
  DialogActions,
  Pagination,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Breadcrumbs
  
} from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar'; // Import Avatar component for displaying images
import HomeIcon from '@mui/icons-material/Home'; // Ensure you have this icon imported
import WorkIcon from '@mui/icons-material/Work';
import { styled } from '@mui/system';


const primaryColor = '#1976d2'; // Use this color throughout your component as needed.

const SamplePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState({});
  const [selectAll, setSelectAll] = useState(false);
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
    const mockUsers = [
      { id: 1, nom: 'Doe', prenom: 'John', date_naissance: '1990-01-01', login_method: 'PassOrFingerOrCard', type: 'Type A', verified: true },
      { id: 2, nom: 'Smith', prenom: 'Jane', date_naissance: '1995-05-05', login_method: 'Card', type: 'Type B', verified: false }
    ];
    setUsers(mockUsers);
    setSelectedUsers(mockUsers.reduce((acc, user) => ({ ...acc, [user.id]: false }), {}));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const CustomLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    color: '#4A90E2', // Change to a more vivid color on hover
  },
  transition: 'color 0.3s ease'
});

const AnimatedBreadcrumb = styled(Breadcrumbs)({
  '& .MuiBreadcrumbs-separator': {
    marginLeft: 8,
    marginRight: 8,
    color: '#ccc', // Customize separator color
    transform: 'scale(1.5)',
  }
});



   // Toggle all checkboxes
   const handleSelectAll = (event) => {
    const newSelectedUsers = {};
    if (event.target.checked) {
      filteredUsers.forEach(user => {
        newSelectedUsers[user.id] = true;
      });
    }
    setSelectedUsers(newSelectedUsers);
  };
  // Toggle single checkbox
  const handleSelectOne = (event, id) => {
    const newSelectedUsers = { ...selectedUsers, [id]: event.target.checked };
    setSelectedUsers(newSelectedUsers);
  };

  // Check if all users are selected
  const isAllSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers[user.id]);

  // Function to handle deleting selected users
  const handleDeleteSelected = () => {
    const remainingUsers = filteredUsers.filter(user => !selectedUsers[user.id]);
    // Assuming you set users state similarly
    // setUsers(remainingUsers);
    setSelectedUsers({});
  };


  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    setUsers(users.concat({ ...newEmployee, id: users.length + 1, verified: false }));
    setOpenAddDialog(false);
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Box sx={{
      backgroundColor: '#F7F7F7', // Subtle background color
      padding: '8px 16px', // Padding for aesthetic spacing
      borderRadius: '4px', // Soften the edges a bit
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
      margin: '16px', // Margin to separate from content
      '& a': { textDecoration: 'none' }, // Removes underline from links
      '& a:hover': { textDecoration: 'underline' }, // Underline on hover for better interactivity
      display: 'flex', alignItems: 'center' // Align items for better visual alignment
    }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          <Link to="/" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
            Home
          </Link>
        </Typography>
        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <WorkIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          gestion de employee
        </Typography>
      </Breadcrumbs>
    </Box>
      <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box mb={2} sx={{ width: '100%', maxWidth: 500 }}>  {/* Adjust width as needed */}
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
            ),
            style: { fontSize: '1.25rem' }  // Increase the font size
          }}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px', // More rounded border
              '& fieldset': {
                borderColor: 'rgba(0, 128, 0, 0.5)', // Green transparent border
              },
              '&:hover fieldset': {
                borderColor: 'green', // Solid green on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'green', // Solid green when focused
              }
            }
          }}
        />
      </Box>
    </Grid>
        <Grid item xs={12} sm={6} align="right">
        <Grid item xs={12}>
        <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAddDialog(true)}
          style={{ borderRadius: '20px', backgroundColor: 'rgba(0, 255, 0, 0.3)', color: 'green' }}
          startIcon={<AddIcon />}
        >
          Add New Employee
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteSelected}
          style={{ borderRadius: '20px', backgroundColor: 'rgba(255, 0, 0, 0.3)', marginLeft: '10px', color: 'red' }}
          startIcon={<DeleteIcon />}
        >
          Delete Selected
        </Button>
      </Box>
     </Grid>
   </Grid>





   <Grid item xs={12}>
        <Card sx={{
          backgroundColor: '#F7F7F7', // Light grey background
          border: '1px solid rgba(0, 128, 0, 0.5)', // Transparent green border
          boxShadow: 'none' // Removes shadow for a flatter design
        }}>
          <CardHeader
            title={<Typography component="div" className="card-header" style={{ color: primaryColor }}>
              Employee List
            </Typography>}
          />
          <Divider />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#EFFCEF' }}>
                  <TableCell>Photo</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Login Method</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar src={user.photoUrl} alt={`${user.prenom} ${user.nom}`} />
                    </TableCell>
                    <TableCell>{user.nom}</TableCell>
                    <TableCell>{user.prenom}</TableCell>
                    <TableCell>{user.date_naissance}</TableCell>
                    <TableCell>{user.login_method}</TableCell>
                    <TableCell>{user.type}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteSelected(user.id)}>
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
      <Box mt={2} display="flex" justifyContent="center" alignItems="center">
        {/* Additional components or content can go here */}
      </Box>
    </Grid>
    


      <Box mt={2} display="flex" justifyContent="center" alignItems="center">


























      <Pagination
        count={Math.ceil(filteredUsers.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '50%',
            backgroundColor: '#1976d2',
            color: '#fff',
            margin: '0 2px',
            '&:hover': {
              backgroundColor: '#115293', // Darker shade when hovered
            }
          }
        }}
      />
      <FormControl sx={{ ml: 2 }}>
        <InputLabel id="items-per-page-label"></InputLabel>
        <Select
          labelId="items-per-page-label"
          id="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          MenuProps={{
            PaperProps: {
              sx: {
                '& .MuiMenuItem-root:hover': {
                  backgroundColor: '#e3f2fd', // Light blue background on hover
                  color: '#1976d2' // Blue text color on hover
                }
              }
            }
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
    </Box>







      {/* Add Employee Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details of the employee to add:
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

