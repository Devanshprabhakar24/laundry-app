import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem
} from '@mui/material';
import { AlertContext } from '../context/alertContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const NewOrder = () => {
  const [form, setForm] = useState({
    serviceId: '',
    quantity: 1,
    address: '',
    pickupDate: ''
  });

  const [services, setServices] = useState([]);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const fetchServices = useCallback(async () => {
    try {
      const res = await api.get('/services');
      
      // ✅ FIX: The array of services is inside the 'data' property of the response.
      if (res.data && Array.isArray(res.data.data)) {
        setServices(res.data.data);
      } else {
        // This case handles if the format is ever unexpectedly different
        console.error('Unexpected service response format:', res.data);
        setServices([]);
      }
      
    } catch (err) {
      console.error('Error fetching services:', err);
      showAlert('Could not load services.', 'error');
    }
  }, [showAlert]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The order submission logic requires multiple items, let's adjust it
    const orderData = {
      items: [{ service: form.serviceId, quantity: parseInt(form.quantity, 10) }],
      address: form.address,
      pickupDate: form.pickupDate,
    };

    if (!orderData.items[0].service || !orderData.address || !orderData.pickupDate) {
      showAlert('Please fill all fields', 'error');
      return;
    }

    try {
      await api.post('/orders', orderData);
      showAlert('Order placed successfully!', 'success');
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.error || 'Order failed';
      showAlert(msg, 'error');
    }
  };

  // The JSX part of your component is fine and does not need changes
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Place a New Order
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Service"
            name="serviceId"
            value={form.serviceId}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            {services.length > 0 ? (
              services.map((service) => (
                <MenuItem key={service._id} value={service._id}>
                  {`${service.name} (₹${service.pricePerItem})`}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading services...</MenuItem>
            )}
          </TextField>

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 1 }}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Pickup Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Pickup Date"
            name="pickupDate"
            type="date"
            value={form.pickupDate}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Place Order
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewOrder;