import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EventBooking
        </Typography>
        <Button color="inherit" component={NavLink} to="/events">
          All Events
        </Button>
        {isLoggedIn ? (
          <>
        <Button color="inherit" component={NavLink} to="/create-event">
          Create Event
        </Button>
            <Button color="inherit" component={NavLink} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={NavLink} to="/my-events">
              My Events
            </Button>
            <Button color="primary" variant="contained" onClick={() => setIsLoggedIn(false)}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="primary" variant="contained" component={NavLink} to="/signup">
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
