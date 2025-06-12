const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// --- Auth Routes ---
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// --- Tour, Booking, Review Routes ---
const toursRoute = require('./routes/tours');
const bookingsRoute = require('./routes/bookings');
const reviewsRoute = require('./routes/reviews');

app.use('/api/tours', toursRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/reviews', reviewsRoute);

// --- Root Endpoint ---
app.get('/', (req, res) => res.send('Ceylon Escape API running!'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));