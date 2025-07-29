import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

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

        {/* ✅ FIX: Set subtitle color to be visible */}
        <Typography variant="h5" sx={{ color: 'var(--text-secondary)' }} paragraph>
          Premium laundry services at your doorstep
        </Typography>

        <Box sx={{ mt: 4 }}>
          {user && (
            <>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 2, backgroundColor: 'var(--accent-primary)' }}
                onClick={() => navigate('/order/new')}
              >
                Place New Order
              </Button>
              {/* ✅ FIX: Set outlined button colors to be visible */}
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: 'var(--text-secondary)', color: 'var(--text-primary)' }}
                onClick={() => navigate('/track')}
              >
                Track Order
              </Button>
            </>
          )}

          {!user && (
            <>
              <Button
                variant="contained"
                size="large"
                sx={{ mr: 2, backgroundColor: 'var(--accent-primary)' }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{ borderColor: 'var(--text-secondary)', color: 'var(--text-primary)' }}
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
            {/* ✅ FIX: Style feature cards for dark mode */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>{item.text}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}