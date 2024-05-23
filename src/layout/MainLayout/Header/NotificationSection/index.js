import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  ListItemButton
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import User1 from 'assets/images/users/avatar-1.jpg';
import User2 from 'assets/images/users/avatar-2.jpg';
import User3 from 'assets/images/users/avatar-3.jpg';
import User4 from 'assets/images/users/avatar-4.jpg';

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const anchorRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      setNotifications((prevNotifications) => [message, ...prevNotifications]);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        sx={{
          minWidth: { sm: 50, xs: 35 }
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Notification"
        onClick={handleToggle}
        color="inherit"
      >
        <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem', color: 'green' }} />
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px'
                  }}
                >
                  <PerfectScrollbar style={{ height: 320, overflowX: 'hidden' }}>
                    <ListSubheader disableSticky>
                      <Chip size="small" color="primary" label="New" />
                    </ListSubheader>
                    {notifications.map((notification, index) => (
                      <ListItemButton key={index} alignItemsFlexStart sx={{ pt: 0 }}>
                        <ListItemAvatar>
                          <Avatar alt="Notification" src={User1} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="subtitle1">{notification.type}</Typography>}
                          secondary={<Typography variant="subtitle2">{notification.message}</Typography>}
                        />
                        <ListItemSecondaryAction sx={{ top: 22 }}>
                          <Grid container justifyContent="flex-end">
                            <Grid item>
                              <QueryBuilderTwoToneIcon
                                sx={{
                                  fontSize: '0.75rem',
                                  mr: 0.5,
                                  color: theme.palette.grey[400]
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                                now
                              </Typography>
                            </Grid>
                          </Grid>
                        </ListItemSecondaryAction>
                      </ListItemButton>
                    ))}
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
