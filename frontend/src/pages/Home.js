import React from 'react';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side: Text Content and Call to Action */}
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: 'var(--text-primary)' }}
          >
            Your Local <span style={{ color: 'var(--accent-primary)' }}>Laundry</span> Service
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: 'var(--text-secondary)', my: 3 }}>
            Get premium laundry and dry cleaning delivered right to your doorstep.
          </Typography>
          <Box sx={{ mt: 4 }}>
            {user ? (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mr: 2, backgroundColor: 'var(--accent-primary)', '&:hover': { backgroundColor: 'var(--accent-secondary)' } }}
                  onClick={() => navigate('/order/new')}
                >
                  Place New Order
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
                  onClick={() => navigate('/track')}
                >
                  Track Your Order
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mr: 2, backgroundColor: 'var(--accent-primary)', '&:hover': { backgroundColor: 'var(--accent-secondary)' } }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }}
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Grid>

        {/* Right Side: Illustration */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/images/laundry_illustration.jpg" // Image is on the right
            alt="Laundry service illustration"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px'
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

const FeaturesSection = () => {
    const features = [
      { title: 'Convenient Pickup & Delivery', description: 'Schedule your laundry online and we’ll handle the rest.' },
      { title: 'Professional Cleaning', description: 'Our expert team ensures your clothes are cleaned to the highest standards.' },
      { title: 'Affordable Pricing', description: 'Get premium laundry services without breaking the bank.' },
    ];

  return (
    <Box sx={{ bgcolor: 'var(--bg-secondary)', py: 6 }}>
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
                Why Choose Us?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 3 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'transparent', border: '1px solid var(--border-color)', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{feature.title}</Typography>
                            <Typography variant="body1" sx={{ color: 'var(--text-secondary)' }}>{feature.description}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
  );
};

// The main Home component now assembles the sections
const Home = () => (
  <Box>
    <HeroSection />
    <FeaturesSection />
  </Box>
);

export default Home;