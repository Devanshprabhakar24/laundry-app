import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { AlertContext } from '../context/alertContext';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext); // ✅ Use the login function from context
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email, form.password); // ✅ Call login context function

      showAlert('Login successful!', 'success');

      // Navigate based on role
      const role = data?.user?.role || 'user';
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || 'Login failed';
      showAlert(msg, 'error');
    }
  };

  // The rest of your return statement (JSX) is fine and does not need changes.
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login to LaundryPro
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Your TextFields are fine */}
           <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" fullWidth required sx={{ mb: 2 }}/>
           <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" fullWidth required sx={{ mb: 3 }}/>
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Don’t have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}