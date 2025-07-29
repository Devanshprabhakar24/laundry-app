import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../utils/axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await api.get('/subscriptions');
        setSubscriptions(res.data.data);
      } catch (error) {
        console.error("Failed to load subscriptions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubscribe = async (subscriptionId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/subscriptions/${subscriptionId}/subscribe`);
      alert('Subscription successful!');
      // Optionally, refresh user data in context or redirect
      navigate('/dashboard');
    } catch (error) {
      alert('Subscription failed. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Choose Your Plan
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
        Simple, transparent pricing for all your laundry needs.
      </Typography>
      <Grid container spacing={4} alignItems="flex-end">
        {subscriptions.map((plan) => (
          <Grid item key={plan.name} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="h4" color="primary" sx={{ my: 2 }}>
                  ₹{plan.price}
                  <Typography variant="body1" component="span" color="text.secondary">
                    / {plan.durationInDays === 30 ? 'month' : 'year'}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {plan.description}
                </Typography>
                <Box>
                  {plan.features.map((feature) => (
                    <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" onClick={() => handleSubscribe(plan._id)}>
                  Subscribe
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubscriptionPage;