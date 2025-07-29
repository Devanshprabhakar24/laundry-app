import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Login, PersonAdd, ShoppingCart, Dashboard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (user) {
      // Navigation for logged-in users
      switch (newValue) {
        case 0: navigate('/'); break;
        case 1: navigate('/dashboard'); break;
        case 2: navigate('/order/new'); break;
        case 3: logout(); navigate('/'); break;
        default: break;
      }
    } else {
      // Navigation for guests
      switch (newValue) {
        case 0: navigate('/'); break;
        case 1: navigate('/login'); break;
        case 2: navigate('/register'); break;
        default: break;
      }
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        {user ? (
          <>
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
            <BottomNavigationAction label="New Order" icon={<ShoppingCart />} />
            <BottomNavigationAction label="Logout" icon={<Login />} />
          </>
        ) : (
          <>
            <BottomNavigationAction label="Home" icon={<Home />} />
            <BottomNavigationAction label="Login" icon={<Login />} />
            <BottomNavigationAction label="Register" icon={<PersonAdd />} />
          </>
        )}
      </BottomNavigation>
    </Paper>
  );
}