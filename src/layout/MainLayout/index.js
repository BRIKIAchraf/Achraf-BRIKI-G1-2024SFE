import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, AppBar, Box, Toolbar } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Brightness7 as LampOnIcon, Brightness4 as LampOffIcon } from '@mui/icons-material';
import { keyframes } from '@mui/material/styles';

// project import
import { drawerWidth } from 'config.js';
import Header from './Header';
import Sidebar from './Sidebar';

// custom style
const Main = styled((props) => <main {...props} />)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
}));

const OutletDiv = styled((props) => <div {...props} />)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3)
  },
  padding: theme.spacing(5),
  position: 'relative'
}));

const LED = styled((props) => <div {...props} />)(({ theme, blinking }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  position: 'absolute',
  top: '10%',
  right: '16px',
  transform: 'translateY(-50%)',
  animation: blinking ? `${blink} 1s infinite alternate` : 'none',
}));

const Message = styled((props) => <div {...props} />)(({ theme }) => ({
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: '10px',
  borderRadius: '5px',
  zIndex: -1, // Set z-index to -1 to display behind LED
}));

const blink = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [blinking, setBlinking] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerOpen(matchUpMd);
  }, [matchUpMd]);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/check-api-status');
        const data = await response.json();
        setApiStatus(data.status);
      } catch (error) {
        console.error('Error fetching API status:', error);
        setApiStatus('en panne');
      }
    };

    fetchApiStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinking((prevBlinking) => !prevBlinking);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const ledColor = apiStatus === 'en panne' ? 'red' : 'green';

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar position="fixed" sx={{ zIndex: 1200 }}>
        <Toolbar>
          <Header drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} />
      <Main
        style={{
          marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`,
          marginRight: 'inherit'
        }}
      >
        <Box sx={theme.mixins.toolbar} />
        <OutletDiv>
          <Outlet />
          <LED style={{ backgroundColor: ledColor }} blinking={blinking} />
          <Message>{apiStatus === 'en panne' && 'Le système est en panne'}</Message>
        </OutletDiv>
      </Main>
    </Box>
  );
};

export default MainLayout;
