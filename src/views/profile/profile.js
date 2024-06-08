import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Profile = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('additionalInfo', additionalInfo);
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await axios.post('/api/company', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Company profile saved', response.data);
    } catch (error) {
      console.error('Error saving company profile', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Company Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Additional Information"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              style={{ display: 'none' }}
              id="upload-logo"
            />
            <label htmlFor="upload-logo">
              <Button variant="contained" color="primary" component="span">
                Upload Logo
              </Button>
              {logo && <Typography variant="body1">{logo.name}</Typography>}
            </label>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
