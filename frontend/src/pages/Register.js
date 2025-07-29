import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // ✅ Use AuthContext
import { AlertContext } from '../context/alertContext';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register } = useContext(AuthContext); // ✅ Use the register function
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form.name, form.email, form.password); // ✅ Call register context

      if (res.data?.success) {
        showAlert('Registration successful! Please log in.', 'success');
        navigate('/login');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || 'Registration failed';
      showAlert(msg, 'error');
    }
  };

  // Your return statement (JSX) is fine.
  return (
     <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 10 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        <form onSubmit={handleSubmit}>
           {/* Your TextFields are fine */}
           <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required sx={{ mb: 2 }}/>
           <TextField label="Email" name="email" value={form.email} onChange={handleChange} type="email" fullWidth required sx={{ mb: 2 }}/>
           <TextField label="Password" name="password" value={form.password} onChange={handleChange} type="password" fullWidth required sx={{ mb: 3 }}/>
          <Button type="submit" variant="contained" fullWidth>Register</Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;