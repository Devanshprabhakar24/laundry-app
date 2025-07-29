import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // ✅ Import the useAuth hook

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get the current user state

  const features = [
    { title: 'Fast Turnaround', text: 'Get clothes back in 24 hours' },
    { title: 'Eco-Friendly', text: 'Green cleaning solutions' },
    { title: 'Premium Service', text: 'Professional handling' }
  ];

  return (
    <Container maxWidth="md">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mt: 10, mb: 6 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome to LaundryPro
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Premium laundry services at your doorstep
        </Typography>
        <Box sx={{ mt: 4 }}>
          {/* ✅ SHOW THESE BUTTONS ONLY IF USER IS LOGGED IN */}
          {user && (
            <>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 2 }}
                onClick={() => navigate('/order/new')}
              >
                Place New Order
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/track')}
              >
                Track Order
              </Button>
            </>
          )}

          {/* ✅ SHOW THESE LINKS ONLY IF USER IS A GUEST (NOT LOGGED IN) */}
          {!user && (
            <>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 2 }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} justifyContent="center" mt={6}>
        {features.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="body1">{item.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}