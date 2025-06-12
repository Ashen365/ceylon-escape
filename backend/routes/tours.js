const express = require('express');
const Tour = require('../models/Tour');
const router = express.Router();

// Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a single tour by ID
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ msg: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create a new tour (protect this route later)
router.post('/', async (req, res) => {
  const { title, description, price, image, date } = req.body;
  try {
    const tour = new Tour({ title, description, price, image, date });
    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a tour
router.put('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ msg: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a tour
router.delete('/:id', async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ msg: 'Tour not found' });
    res.json({ msg: 'Tour deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;