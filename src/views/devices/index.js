import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Button, TextField, List, ListItem, ListItemText, CircularProgress, IconButton } from '@mui/material';
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [sdkURL, setSdkURL] = useState('');
  const [installing, setInstalling] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  useEffect(() => {
    // Fetch devices from backend when component mounts
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    // Fetch devices from backend API endpoint
    // Replace '/api/devices' with your actual backend API endpoint for fetching devices
    try {
      const response = await fetch('/api/devices');
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleScanDevices = async () => {
    setScanning(true);
    try {
      // Replace with your backend API endpoint for scanning devices
      const response = await fetch('/api/devices/scan');
      const data = await response.json();
      setDevices(data.devices);
    } catch (error) {
      console.error('Error scanning devices:', error);
    } finally {
      setScanning(false);
    }
  };

  const handleInstallSDK = async (device) => {
    setInstalling(true);
    try {
      // Replace with your backend API endpoint for installing SDK
      const response = await fetch('/api/devices/install-sdk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ device, sdkURL })
      });
      if (response.ok) {
        // Handle success message or any other action upon successful installation
        console.log(`SDK installed successfully on ${device.name}`);
      } else {
        console.error(`Failed to install SDK on ${device.name}`);
      }
    } catch (error) {
      console.error('Error installing SDK:', error);
    } finally {
      setInstalling(false);
    }
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setSdkURL(device.sdkURL);
  };

  const handleSaveEdit = async () => {
    // Perform save edit logic
    setEditingDevice(null);
    setSdkURL('');
    // You can implement logic to update the device with the new SDK URL
  };

  const handleDeleteDevice = async (device) => {
    // Perform delete device logic
    // You can implement logic to delete the device from the backend
  };

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
              <Button variant="contained" color="primary" disabled={scanning} onClick={handleScanDevices}>
                {scanning ? <CircularProgress size={24} /> : 'Scan Devices'}
              </Button>
              {devices.length > 0 && (
                <List>
                  {devices.map((device, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={device.name} secondary={device.ipAddress} />
                      {editingDevice === device ? (
                        <>
                          <TextField
                            variant="outlined"
                            label="SDK URL"
                            fullWidth
                            value={sdkURL}
                            onChange={(e) => setSdkURL(e.target.value)}
                          />
                          <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="contained" color="primary" disabled={installing} onClick={() => handleInstallSDK(device)}>
                            {installing ? <CircularProgress size={20} /> : 'Install SDK'}
                          </Button>
                          <IconButton aria-label="edit" onClick={() => handleEditDevice(device)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => handleDeleteDevice(device)}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
            <Divider />
            <CardContent>
              <TextField
                variant="outlined"
                label="SDK URL"
                fullWidth
                value={sdkURL}
                onChange={(e) => setSdkURL(e.target.value)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default DeviceManagement;
