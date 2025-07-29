// backend/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// --- Connect to Database ---
connectDB();

const app = express();

// --- Import Route Files ---
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const subscriptionRoutes = require('./routes/subscription'); // ✅ ADD THIS

// --- Core Middleware ---
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.options('*', cors()); 

app.use(express.json());
app.use(cookieParser());

// --- API Routes ---
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes); // ✅ ADD THIS

// --- Default Route for Health Check ---
app.get('/', (req, res) => {
  res.send('🚀 Laundry Service API is running...');
});

// --- Error Handler Middleware (MUST be last) ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});