import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Button, ListItem, CircularProgress, IconButton, Chip } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const mockDevices = [
  { id: 1, name: 'Device 1', ipAddress: '192.168.1.1', type: 'PC', connected: true, sdkInstalled: true },
  { id: 2, name: 'Device 2', ipAddress: '192.168.1.2', type: 'Phone', connected: true, sdkInstalled: true },
  { id: 3, name: 'Device 3', ipAddress: '192.168.1.3', type: 'Tablet', connected: true, sdkInstalled: true }
];

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [installing, setInstalling] = useState(false);

  const handleScanDevices = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      // Simulate detecting new devices and add them to the devices array
      const newDevices = [
        { id: 4, name: 'Device 4', ipAddress: '192.168.1.4', type: 'Laptop', connected: true, sdkInstalled: false },
        { id: 5, name: 'Device 5', ipAddress: '192.168.1.5', type: 'Smartwatch', connected: false, sdkInstalled: true },
        { id: 6, name: 'Device 6', ipAddress: '192.168.1.6', type: 'Smart TV', connected: false, sdkInstalled: false }
      ];
      setDevices(prevDevices => [...prevDevices, ...newDevices]);
    }, 1000);
  };

  const handleConnectToDevice = (device) => {
    // Implement logic to handle connecting to device
    const updatedDevices = devices.map(dev => {
      if (dev.id === device.id) {
        return { ...dev, connected: true };
      }
      return dev;
    });
    setDevices(updatedDevices);
  };

  const handleInstallSDK = (device) => {
    // Implement logic to handle installing SDK
    const updatedDevices = devices.map(dev => {
      if (dev.id === device.id) {
        return { ...dev, sdkInstalled: true };
      }
      return dev;
    });
    setDevices(updatedDevices);
  };

  const handleEditDevice = (device) => {
    // Implement logic for editing device
  };

  const handleDeleteDevice = (device) => {
    // Implement logic for deleting device
  };

  useEffect(() => {
    // Initialize devices that are already connected and have SDK installed
    setDevices(mockDevices);
  }, []);

  const connectedDevices = devices.filter(device => device.connected && device.sdkInstalled);
  const newDevices = devices.filter(device => !device.connected || !device.sdkInstalled);

  return (
    <>
      <Breadcrumb title="Device Management">
        <Typography variant="subtitle2" color="inherit">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary">
          Device Management
        </Typography>
      </Breadcrumb>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography component="div" variant="h4">
                  Devices
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Grid container justifyContent="center" spacing={gridSpacing}>
                <Grid item>
                  <Button variant="contained" color="primary" disabled={scanning} onClick={handleScanDevices} style={{ marginBottom: '10px' }}  >
                    {scanning ? <CircularProgress size={24} /> : 'Scan Devices'}
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={gridSpacing} direction="row">
                <Grid item xs={12} md={6}>
                  {connectedDevices.length > 0 && (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Connected Devices
                      </Typography>
                      {connectedDevices.map((device, index) => (
                        <Card key={index} variant="outlined" style={{ marginBottom: '16px' }}>
                          <ListItem>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                  {device.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                  IP Address: {device.ipAddress}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                  Type: {device.type}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
                                <Grid item>
                                  <Chip
                                    label={device.connected ? "Connected" : "Disconnected"}
                                    color={device.connected ? "success" : "default"}
                                    style={{ marginRight: '20px' }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleConnectToDevice(device)}
                                    disabled={device.connected || device.sdkInstalled}
                                    style={{ marginRight: '16px' }}
                                  >
                                    Connect
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    icon={device.sdkInstalled ? <CheckCircleOutlineIcon /> : null}
                                    label={device.sdkInstalled ? "SDK Installed" : "SDK Not Installed"}
                                    color={device.sdkInstalled ? "success" : "default"}
                                    style={{ marginRight: '20px', marginTop: '10px' }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!device.connected || installing || device.sdkInstalled} onClick={() => handleInstallSDK(device)}
                                    style={{ marginTop: '10px' }}
                                  >
                                    {installing ? <CircularProgress size={20} /> : 'Install SDK'}
                                  </Button>
                                </Grid>
                                <Grid item container alignItems="center" spacing={1}>
                                  <Grid item xs={8} md={6} container justifyContent="flex-end" alignItems="center">
                                    <IconButton
                                      aria-label="edit"
                                      onClick={() => handleEditDevice(device)}
                                      style={{ color: 'blue', backgroundColor: 'lightblue' , marginTop:'20px'}} // Change color and background for edit button
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Grid>
                                  <Grid item xs={8} md={2} container justifyContent="flex-end" alignItems="center">
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => handleDeleteDevice(device)}
                                      style={{ color: 'red', backgroundColor: 'pink', marginTop:'20px' }} // Change color and background for delete button
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>

                              </Grid>
                            </Grid>
                          </ListItem>
                        </Card>
                      ))}
                    </>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  {newDevices.length > 0 ? (
                    <>
                      <Typography variant="h6" gutterBottom>
                        New Devices
                      </Typography>
                      {newDevices.map((device, index) => (
                        <Card key={index} variant="outlined" style={{ marginBottom: '16px' }}>
                          <ListItem>
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Typography variant="h6" gutterBottom>
                                  {device.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                  IP Address: {device.ipAddress}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                  Type: {device.type}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
                                <Grid item>
                                  <Chip
                                    label={device.connected ? "Connected" : "Disconnected"}
                                    color={device.connected ? "success" : "default"}
                                    style={{ marginRight: '20px' }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleConnectToDevice(device)}
                                    style={{ marginRight: '16px' }}
                                  >
                                    Connect
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Chip
                                    icon={device.sdkInstalled ? <CheckCircleOutlineIcon /> : null}
                                    label={device.sdkInstalled ? "SDK Installed" : "SDK Not Installed"}
                                    color={device.sdkInstalled ? "success" : "default"}
                                    style={{ marginRight: '20px', marginTop: '10px' }}

                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!device.connected || installing}
                                    onClick={() => handleInstallSDK(device)}
                                    style={{ marginTop: '10px' }}
                                  >
                                    {installing ? <CircularProgress size={20} /> : 'Install SDK'}
                                  </Button>
                                </Grid>
                                <Grid item container alignItems="center" spacing={1}>
                                  <Grid item xs={8} md={6} container justifyContent="flex-end" alignItems="center">
                                    <IconButton
                                      aria-label="edit"
                                      onClick={() => handleEditDevice(device)}
                                      style={{ color: 'blue', backgroundColor: 'lightblue' ,  marginTop:'20px'}} // Change color and background for edit button
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Grid>
                                  <Grid item xs={8} md={2} container justifyContent="flex-end" alignItems="center">
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() => handleDeleteDevice(device)}
                                      style={{ color: 'red', backgroundColor: 'pink' , marginTop:'20px'}} // Change color and background for delete button
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>

                              </Grid>
                            </Grid>
                          </ListItem>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                      <Typography variant="body1" color="textSecondary" style={{ marginTop: '30px' }}>
                        No new devices found.
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceManagement;
