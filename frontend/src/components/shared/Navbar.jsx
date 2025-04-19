import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          HOA Management
        </Typography>

        {isLoggedIn ? (
          <Box>
            <Button color="inherit" component={Link} to="/payments">Payments</Button>
            <Button color="inherit" component={Link} to="/announcements">Announcements</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
