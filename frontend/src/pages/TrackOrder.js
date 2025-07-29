import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  styled
} from '@mui/material';
import axios from 'axios';
import { AlertContext } from '../context/alertContext';
import { AuthContext } from '../context/authContext';
import MapPicker from '../components/MapPicker';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const TrackOrder = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const { token } = useContext(AuthContext); // Optional: if tracking requires auth

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      showAlert('Please enter a tracking code', 'warning');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/orders/track/${trackingCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(res.data.data);
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to fetch order';
      showAlert(msg, 'error');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        {order ? 'Order Tracking' : 'Track Your Order'}
      </Typography>

      {!order ? (
        <StyledPaper>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <TextField
              label="Tracking Code"
              fullWidth
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleTrack}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Track'}
            </Button>
          </Box>
        </StyledPaper>
      ) : (
        <>
          <StyledPaper>
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography>Status: {order.status}</Typography>
            <Typography>Customer: {order.user?.name}</Typography>
            <Typography>Address: {order.address?.street}, {order.address?.city}</Typography>
            <Typography>Created At: {new Date(order.createdAt).toLocaleString()}</Typography>
          </StyledPaper>

          <StyledPaper>
            <Typography variant="h6" gutterBottom>Pickup & Delivery Map</Typography>
            <MapPicker 
              pickup={order.pickupLocation} 
              delivery={order.deliveryLocation} 
              readOnly 
            />
          </StyledPaper>

          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Service Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.serviceType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Box textAlign="center" mt={3}>
            <Button variant="outlined" onClick={() => setOrder(null)}>
              Track Another Order
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TrackOrder;
