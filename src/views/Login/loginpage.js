import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Box, Typography, AppBar, Toolbar, Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from '../../assets/office.png'; // Ensure you have an image at this path

const ImageContainer = styled(Box)({
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh', // Full height for the image section
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Attendance Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid item xs={12} md={6}>
          <ImageContainer />
        </Grid>
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '100vh',
          backgroundColor: '#f7f7f7'
        }}>
          <Container>
            <Typography variant="h2" gutterBottom>
              Welcome to Your Attendance Dashboard
            </Typography>
            <Typography variant="h5" paragraph>
              Manage and track attendance efficiently
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={() => loginWithRedirect()}>
              Log In
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Track employee attendance with ease and precision.
            </Typography>
          </Container>
        </Grid>
      </Grid>

      <Box component="footer" sx={{ p: 3, bgcolor: '#eee', mt: 'auto', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Attendance Management System
        </Typography>
      </Box>
    </>
  );
};

export default LoginPage;
