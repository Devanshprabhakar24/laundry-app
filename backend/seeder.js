const mongoose = require('mongoose');
require('dotenv').config();

// Load models
const Service = require('./models/Service');
const Subscription = require('./models/Subscription'); // ✅ ADD THIS

// Sample Data for Services
const services = [
  // Original Services
  { name: 'Wash & Fold', pricePerItem: 150 },
  { name: 'Dry Cleaning', pricePerItem: 250 },
  { name: 'Ironing Only', pricePerItem: 50 },
  { name: 'Bedding & Comforters', pricePerItem: 500 },
  { name: 'Shirt (Wash & Iron)', pricePerItem: 70 },
  { name: 'Trousers/Jeans (Wash & Iron)', pricePerItem: 90 },
  { name: 'T-Shirt (Wash & Fold)', pricePerItem: 60 },
  { name: 'Suit (2-piece, Dry Clean)', pricePerItem: 550 },
  { name: 'Saree (Dry Clean)', pricePerItem: 300 },
  { name: 'Kurta/Kurti (Wash & Iron)', pricePerItem: 80 },
  { name: 'Jacket (Dry Clean)', pricePerItem: 350 },
  { name: 'Sweater (Woolen Wash)', pricePerItem: 180 },
  { name: 'Single Bedsheet', pricePerItem: 120 },
  { name: 'Double Bedsheet', pricePerItem: 200 },
  { name: 'Pillow Cover', pricePerItem: 30 },
  { name: 'Towel (Bath)', pricePerItem: 60 },
  { name: 'Curtains (per panel, Dry Clean)', pricePerItem: 400 },
  { name: 'Leather Jacket Cleaning', pricePerItem: 1200 },
  { name: "Sneaker Cleaning", pricePerItem: 450 },
  { name: 'Dress (Formal, Dry Clean)', pricePerItem: 600 },
  { name: 'Lehenga (Dry Clean)', pricePerItem: 800 },
];

// ✅ FIX: Corrected syntax by moving to a new line
const subscriptions = [
  {
    name: 'Basic Monthly',
    description: 'Perfect for individuals. Get your essentials cleaned every month.',
    price: 999,
    durationInDays: 30,
    features: ['10% off on all orders', 'Free delivery on orders over ₹500'],
  },
  {
    name: 'Family Monthly',
    description: 'Ideal for families. Keep everyone looking sharp all month long.',
    price: 2499,
    durationInDays: 30,
    features: ['15% off on all orders', 'Free delivery on all orders', 'Priority Service'],
  },
  {
    name: 'Premium Annual',
    description: 'The ultimate laundry solution for the entire year. Best value!',
    price: 9999,
    durationInDays: 365,
    features: ['25% off on all orders', 'Free delivery on all orders', 'Priority Service', 'Free Stain Removal'],
  },
];

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Service.deleteMany();
    await Subscription.deleteMany(); // ✅ ADD THIS

    // Insert new data
    await Service.insertMany(services);
    await Subscription.insertMany(subscriptions); // ✅ ADD THIS
    
    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    process.exit(1);
  }
};

// Run the function
importData();