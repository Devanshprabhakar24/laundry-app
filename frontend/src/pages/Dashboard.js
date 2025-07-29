import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box
} from '@mui/material';
import api from '../utils/axios';
import { AuthContext } from '../context/authContext';
import { AlertContext } from '../context/alertContext';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const endpoint =
          user.role === 'admin'
            ? '/orders'
            : user.role === 'driver'
            ? `/orders/driver/${user._id}`
            : '/orders/myorders';

        const res = await api.get(endpoint);
        setOrders(res?.data?.data || []);
      } catch (error) {
        showAlert('Failed to load orders', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, showAlert]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        {user?.role === 'admin'
          ? 'All Orders'
          : user?.role === 'driver'
          ? 'Assigned Orders'
          : 'My Orders'}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <Paper sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Delivery</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order?._id}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.status || 'N/A'}</TableCell>
                  <TableCell>₹{order?.totalPrice || 0}</TableCell>
                  <TableCell>{formatDate(order?.pickupDate)}</TableCell>
                  <TableCell>{formatDate(order?.deliveryDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
}
