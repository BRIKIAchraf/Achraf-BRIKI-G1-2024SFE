import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { useMediaQuery, AppBar, Box, Toolbar } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import  NotificationSection from 'layout/MainLayout/Header/NotificationSection';
import SearchSection from 'layout/MainLayout/Header/SearchSection';
import ProfileSection from 'layout/MainLayout/Header/ProfileSection';
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

const blink = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Message = styled((props) => <div {...props} />)(({ theme, color }) => ({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: color,
  padding: '10px',
  borderRadius: '5px',
  animation: `${blink} 1s infinite alternate`,
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState('');

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

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Sidebar drawerOpen={drawerOpen} drawerToggle={handleDrawerToggle} sx={{ zIndex: 1400 }} />
      <Main
        style={{
          marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`,
          marginRight: 'inherit'
        }}
      >
        <Box sx={theme.mixins.toolbar} />
        <OutletDiv>
          <Outlet />
          {apiStatus === 'en panne' ? (
            <Message color="rgba(255, 0, 0, 0.7)">Le système est en panne</Message>
          ) : (
            <Message color="rgba(0, 128, 0, 0.7)">Le système fonctionne correctement</Message>
          )}
        </OutletDiv>
      </Main>
    </Box>
  );
};

export default MainLayout;
