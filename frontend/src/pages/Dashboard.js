import React from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

// Styled Paper component for our dark theme
const StyledPaper = (props) => (
  <Paper
    elevation={3}
    sx={{
      padding: 3,
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    }}
    {...props}
  />
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {/* --- Main Content (Center) --- */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="var(--text-secondary)" sx={{ mb: 4 }}>
          What would you like to do today?
        </Typography>
        <StyledPaper>
          <Typography variant="h6" gutterBottom>Place a New Order</Typography>
          <Typography variant="body2" color="var(--text-secondary)" sx={{ mb: 2 }}>
            Get your laundry fresh and clean in no time.
          </Typography>
          <Button variant="contained" sx={{backgroundColor: 'var(--accent-primary)'}} onClick={() => navigate('/order/new')}>
            New Order
          </Button>
        </StyledPaper>

        {/* Recent Orders Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>Recent Orders</Typography>
          <StyledPaper>
            <List>
              <ListItem>
                <ListItemText primary="Order #12345" secondary="Status: Processing" />
              </ListItem>
              <Divider sx={{ borderColor: 'var(--border-color)' }} />
              <ListItem>
                <ListItemText primary="Order #12344" secondary="Status: Completed" />
              </ListItem>
            </List>
          </StyledPaper>
        </Box>
      </Box>

      {/* --- Right Sidebar --- */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" gutterBottom>My Subscription</Typography>
        <StyledPaper>
          <Typography variant="h6">Family Monthly</Typography>
          <Typography variant="body2" color="var(--text-secondary)">
            Expires on: 25 Aug 2024
          </Typography>
          <Button variant="outlined" sx={{ mt: 2, color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }} onClick={() => navigate('/subscription')}>
            Manage Plan
          </Button>
        </StyledPaper>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom>Quick Stats</Typography>
          <StyledPaper>
            <Typography variant="h6">Orders this month: 5</Typography>
            <Typography variant="body2" color="var(--text-secondary)">Total Spent: ₹3,500</Typography>
          </StyledPaper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;