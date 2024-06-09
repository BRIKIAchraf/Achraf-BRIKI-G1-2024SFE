import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, fetchProfile, setName, setAddress, setAdditionalInfo, setLogo } from '../../store/profileSlice';
import {
  Container, Typography, TextField, Button, Grid, CircularProgress, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert,
  Card, CardContent, CardActions, CardHeader, Paper
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/system';

const Input = styled('input')({
  display: 'none',
});

const Profile = () => {
  const dispatch = useDispatch();
  const { name, address, additionalInfo, logo, logoUrl, status, error } = useSelector(state => state.profile);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    try {
      dispatch(fetchProfile()).unwrap()
        .then((response) => {
          console.log('Fetched Profile Data:', response);
        })
        .catch((err) => {
          console.error('Error Fetching Profile Data:', err);
        });
    } catch (error) {
      console.error('Fetch Profile Error:', error);
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('additionalInfo', additionalInfo);
      if (logo instanceof Blob) {
        formData.append('logo', logo);
      }

      dispatch(updateProfile(formData))
        .unwrap()
        .then(() => {
          setSnackbarMessage('Company profile saved successfully!');
          setSnackbarSeverity('success');
        })
        .catch((err) => {
          console.error('Error Updating Profile:', err);
          setSnackbarMessage('Failed to save company profile.');
          setSnackbarSeverity('error');
        })
        .finally(() => {
          setOpenSnackbar(true);
        });
    } catch (error) {
      console.error('Submit Error:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (e) => {
    try {
      dispatch(setLogo(e.target.files[0]));
      setOpenDialog(true);
    } catch (error) {
      console.error('File Change Error:', error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Card variant="outlined" sx={{ mt: 4, p: 2 }}>
        <CardHeader
          title="Update Company Profile"
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      value={name}
                      onChange={(e) => dispatch(setName(e.target.value))}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => dispatch(setAddress(e.target.value))}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Additional Information"
                      value={additionalInfo}
                      onChange={(e) => dispatch(setAdditionalInfo(e.target.value))}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <label htmlFor="upload-logo">
                      <Input accept="image/*" id="upload-logo" type="file" onChange={handleFileChange} />
                      <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                        Upload Logo
                      </Button>
                    </label>
                    {logo && <Typography variant="body1" sx={{ mt: 2 }}>{logo.name}</Typography>}
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary" disabled={status === 'loading'}>
                      {status === 'loading' ? <CircularProgress size={24} /> : 'Save Profile'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              {logoUrl && (
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', mb: 2 }}>Logo Preview</Typography>
                  <img
                    src={logoUrl}
                    alt="Logo Preview"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 2 }}><strong style={{ color: '#3f51b5' }}>Name:</strong> {name}</Typography>
                  <Typography variant="subtitle1"><strong style={{ color: '#3f51b5' }}>Address:</strong> {address}</Typography>
                  <Typography variant="subtitle1"><strong style={{ color: '#3f51b5' }}>Additional Info:</strong> {additionalInfo}</Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
          <Typography variant="caption" color="textSecondary">
            Make sure all information is correct before saving.
          </Typography>
        </CardActions>
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Logo Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm the logo you have selected.
          </DialogContentText>
          {logo && logo instanceof Blob && (
            <img
              src={URL.createObjectURL(logo)}
              alt="Logo Preview"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
