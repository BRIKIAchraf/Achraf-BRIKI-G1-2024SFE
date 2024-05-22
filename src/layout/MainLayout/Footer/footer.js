import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#F2F7FF',
        textAlign: 'center',
        py: 2,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
