import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuth = async () => {
        try {
            await axios.get(
                'http://localhost:3000/api/users/me',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsLoggedIn(false);
        }
    };

    checkUserAuth();
}, []);

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
  setIsLoggedIn(false);
};

  return (
    <AppBar position="fixed" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          EventBooking
        </Typography>
        <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
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
            <Button color="primary" variant="contained" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={NavLink} to="/login" >
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
