import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Typography, List, ListItem, ListItemText, IconButton, Snackbar, Alert, Card, CardContent, CardHeader, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

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
  const [devices, setDevices] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      // const data = await listDevices();
      // setDevices(data);
      setLoading(false);
    } catch (error) {
      setResult('Error listing devices');
      setLoading(false);
    }
  };

  const handleScanByPort = async () => {
    try {
      setLoading(true);
      // const data = await scanDeviceByPort(port);
      // setResult(data);
      setLoading(false);
      setSuccessMessage('Device scanned by port successfully!');
      setOpenSnackbar(true);
      fetchDevices();
    } catch (error) {
      setResult('Error scanning device by port');
      setLoading(false);
    }
  };

  const handleScanByInet = async () => {
    try {
      setLoading(true);
      // const data = await scanDeviceByInet(inet);
      // setResult(data);
      setLoading(false);
      setSuccessMessage('Device scanned by inet successfully!');
      setOpenSnackbar(true);
      fetchDevices();
    } catch (error) {
      setResult('Error scanning device by inet');
      setLoading(false);
    }
  };

  const handlePingDevice = async () => {
    try {
      setLoading(true);
      // const data = await pingDeviceById(deviceId);
      // setResult(data);
      setLoading(false);
      setSuccessMessage('Device pinged successfully!');
      setOpenSnackbar(true);
      fetchDevices();
    } catch (error) {
      setResult('Error pinging device');
      setLoading(false);
    }
  };

  const handleUpdateDevice = async () => {
    try {
      setLoading(true);
      // const data = await updateDevice(deviceId, newName);
      setLoading(false);
      setSuccessMessage('Device updated successfully!');
      setOpenSnackbar(true);
      fetchDevices();
    } catch (error) {
      setResult('Error updating device');
      setLoading(false);
    }
  };

  const handleRemoveDevice = async (id) => {
    try {
      setLoading(true);
      // await removeDevice(id);
      setLoading(false);
      setSuccessMessage('Device removed successfully!');
      setOpenSnackbar(true);
      fetchDevices();
    } catch (error) {
      setResult('Error removing device');
      setLoading(false);
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
            title="Device Manager"
            titleTypographyProps={{ variant: 'h5' }}
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Scan Device by Port</Typography>
                <TextField
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleScanByPort} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Scan'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Scan Device by Inet</Typography>
                <TextField
                  type="text"
                  value={inet}
                  onChange={(e) => setInet(e.target.value)}
                  placeholder="Inet"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleScanByInet} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Scan'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Ping Device by ID</Typography>
                <TextField
                  type="text"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Device ID"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handlePingDevice} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Ping'}
                </CustomButton>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Update Device</Typography>
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
                  placeholder="New Device Name"
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <CustomButton variant="contained" color="primary" onClick={handleUpdateDevice} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Update'}
                </CustomButton>
              </Grid>
            </Grid>
          </CardContent>
        </CustomCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomCard>
          <CustomCardHeader
            title="List of Devices"
            titleTypographyProps={{ variant: 'h5' }}
          />
          <CardContent>
            {loading ? (
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
