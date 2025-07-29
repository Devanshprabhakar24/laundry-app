import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// Import Providers
import { AuthProvider } from './context/authContext';
import { AlertProvider } from './context/alertContext';

// Import Pages and Components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import AlertSnackbar from './components/AlertSnackbar';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Garments from './pages/Garments';
import TrackOrder from './pages/TrackOrder';
import SubscriptionPage from './pages/Subscription'; // ✅ Import Subscription Page

export default function App() {
  return (
    <AlertProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <AlertSnackbar />
          <Container component="main" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected User Routes */}
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/order/new" element={<PrivateRoute><NewOrder /></PrivateRoute>} />
              <Route path="/garments" element={<PrivateRoute><Garments /></PrivateRoute>} />
              <Route path="/track" element={<PrivateRoute><TrackOrder /></PrivateRoute>} />
              <Route path="/subscription" element={<PrivateRoute><SubscriptionPage /></PrivateRoute>} /> {/* ✅ Add Subscription Route */}

              {/* Protected Admin Route */}
              <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </AuthProvider>
    </AlertProvider>
  );
}