const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user tour');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('tour');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create a booking
router.post('/', async (req, res) => {
  const { user, tour, bookingDate } = req.body;
  try {
    const booking = new Booking({ user, tour, bookingDate });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate booking error
      return res.status(400).json({ msg: 'You have already booked this tour for this date.' });
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    console.error('Booking creation error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a booking by ID
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate booking error on update
      return res.status(400).json({ msg: 'You have already booked this tour for this date.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// Cancel (delete) a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    res.json({ msg: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;