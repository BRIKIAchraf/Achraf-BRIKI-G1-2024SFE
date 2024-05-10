import React from 'react';
import { Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LockIcon from '@mui/icons-material/Lock';

const LoginMethodsList = ({ unassignedLoginMethods, assignedLoginMethods, onAssign, onDelete }) => {
  const renderIcon = (methodType) => {
    switch (methodType) {
      case 'Fingerprint':
        return <FingerprintIcon />;
      case 'Credit Card':
        return <CreditCardIcon />;
      case 'Password':
        return <LockIcon />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '960px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Unassigned Login Methods:
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Display unassigned and assigned methods similar to your existing setup */}
      </Grid>
    </div>
  );
};

export default LoginMethodsList;
