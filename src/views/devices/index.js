import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Typography, List, ListItem, ListItemText, IconButton, Snackbar, Alert, Card, CardContent, CardHeader, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDevices, scanDeviceByPort, scanDeviceByInet, pingDeviceById, updateDevice, removeDevice
} from '../../store/deviceSlice';

const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: 3,
  marginBottom: theme.spacing(2),
}));

const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
  background: 'linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)',
  color: 'white',
  fontWeight: 'bold',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DeviceManager = () => {
  const [port, setPort] = useState('');
  const [inet, setInet] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [newName, setNewName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const devices = useSelector(state => state.devices.devices);
  const status = useSelector(state => state.devices.status);
  const error = useSelector(state => state.devices.error);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const handleScanByPort = async () => {
    try {
      await dispatch(scanDeviceByPort(port)).unwrap();
      setSuccessMessage('Device scanned by port successfully!');
      setOpenSnackbar(true);
      dispatch(fetchDevices());
    } catch (error) {
      console.error('Error scanning device by port', error);
    }
  };

  const handleScanByInet = async () => {
    try {
      await dispatch(scanDeviceByInet(inet)).unwrap();
      setSuccessMessage('Device scanned by inet successfully!');
      setOpenSnackbar(true);
      dispatch(fetchDevices());
    } catch (error) {
      console.error('Error scanning device by inet', error);
    }
  };

  const handlePingDevice = async () => {
    try {
      await dispatch(pingDeviceById(deviceId)).unwrap();
      setSuccessMessage('Device pinged successfully!');
      setOpenSnackbar(true);
      dispatch(fetchDevices());
    } catch (error) {
      console.error('Error pinging device', error);
    }
  };

  const handleUpdateDevice = async () => {
    try {
      await dispatch(updateDevice({ deviceId, newName })).unwrap();
      setSuccessMessage('Device updated successfully!');
      setOpenSnackbar(true);
      dispatch(fetchDevices());
    } catch (error) {
      console.error('Error updating device', error);
    }
  };

  const handleRemoveDevice = async (id) => {
    try {
      await dispatch(removeDevice(id)).unwrap();
      setSuccessMessage('Device removed successfully!');
      setOpenSnackbar(true);
      dispatch(fetchDevices());
    } catch (error) {
      console.error('Error removing device', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <CustomCard>
          <CustomCardHeader
            title="Gestion d'appareil"
            titleTypographyProps={{ variant: 'h5' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Scanner Appareils par le Port</Typography>
                <TextField
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleScanByPort} disabled={status === 'loading'}>
                  {status === 'loading' ? <CircularProgress size={24} /> : 'Scan'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Scanner appareil par Inet</Typography>
                <TextField
                  type="text"
                  value={inet}
                  onChange={(e) => setInet(e.target.value)}
                  placeholder="Inet"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleScanByInet} disabled={status === 'loading'}>
                  {status === 'loading' ? <CircularProgress size={24} /> : 'Scan'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Ping appareil par ID</Typography>
                <TextField
                  type="text"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Device ID"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handlePingDevice} disabled={status === 'loading'}>
                  {status === 'loading' ? <CircularProgress size={24} /> : 'Ping'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Modifier Appareil</Typography>
                <TextField
                  type="text"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Device ID"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nouveau nom"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleUpdateDevice} disabled={status === 'loading'}>
                  {status === 'loading' ? <CircularProgress size={24} /> : 'Update'}
                </CustomButton>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomCard>
          <CustomCardHeader
            title="Liste des appareils"
            titleTypographyProps={{ variant: 'h5' }}
          />
          <CardContent>
            {status === 'loading' ? (
              <CircularProgress />
            ) : (
              <List>
                {devices.map((device) => (
                  <ListItem key={device._id}>
                    <ListItemText primary={`${device.name} (ID: ${device._id})`} />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDevice(device._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </CustomCard>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DeviceManager;
