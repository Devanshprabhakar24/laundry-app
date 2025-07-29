import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">LaundryPro</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/order/new">New Order</Link>
            <Link to="/track">Track Order</Link> {/* ✅ ADDED Track Order Link */}
            <Link to="/garments">Garments</Link> {/* ✅ ADDED Garments Link */}
            <Link to="/subscription">Subscription</Link>
            {user.role === 'admin' && (
              <Link to="/admin/dashboard">Admin</Link>
            )}
            
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;