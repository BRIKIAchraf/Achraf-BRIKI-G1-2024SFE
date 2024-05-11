import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlannings, deletePlanning, addPlanning } from '../../store/planningSlice';
import {
  Card, CardHeader, CardContent, Divider, Grid, Typography, Table, TableHead,
  TableBody, TableRow, TableCell, Button, TableContainer, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, IconButton, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

const PlanningManagement = () => {
  const dispatch = useDispatch();
  const { plannings, status } = useSelector(state => state.planning);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newPlanning, setNewPlanning] = useState({ intitule: '' });

  useEffect(() => {
    dispatch(fetchPlannings());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch(deletePlanning(deleteId));
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setOpenAddDialog(false);
  };

  const toggleExpandRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddPlanning = () => {
    dispatch(addPlanning(newPlanning));
    setOpenAddDialog(false);
    setNewPlanning({ intitule: '' });
  };

  const handleInputChange = (e) => {
    setNewPlanning({ ...newPlanning, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Breadcrumb title="Planning Management">
        <Typography variant="subtitle2" color="inherit">Home</Typography>
        <Typography variant="subtitle2" color="primary">Planning Management</Typography>
      </Breadcrumb>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpenAddDialog(true)}
      >
        Add Planning
      </Button>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Typography variant="h4">Planning List</Typography>} />
            <Divider />
            <CardContent>
              {status === 'loading' ? (
                <CircularProgress />
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Intitule</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {plannings.map((planning) => (
                        <>
                          <TableRow key={planning._id}>
                            <TableCell>{planning._id}</TableCell>
                            <TableCell>{planning.intitule}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => toggleExpandRow(planning._id)}>
                                <ExpandMoreIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDeleteClick(planning._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedId === planning._id && planning.jours.map((jour) => (
                            <TableRow key={jour._id}>
                              <TableCell style={{ paddingLeft: 40 }}>Day Entry: {jour._id}</TableCell>
                              <TableCell colSpan={3}>
                                Morning: {new Date(jour.h_entree1).toLocaleTimeString()} - {new Date(jour.h_sortie1).toLocaleTimeString()},
                                Afternoon: {new Date(jour.h_entree2).toLocaleTimeString()} - {new Date(jour.h_sortie2).toLocaleTimeString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this planning? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAddDialog} onClose={handleClose}>
        <DialogTitle>Add New Planning</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Intitule"
            type="text"
            fullWidth
            variant="outlined"
            name="intitule"
            value={newPlanning.intitule}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddPlanning} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlanningManagement;
