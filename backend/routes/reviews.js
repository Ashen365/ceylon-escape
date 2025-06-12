const express = require('express');
const Review = require('../models/Review');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// ...other routes...

// Create a review (protected)
router.post('/', protect, async (req, res) => {
  const { tour, rating, comment } = req.body;
  try {
    const review = new Review({ user: req.user.id, tour, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a review (only owner or admin)
router.put('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a review (only owner or admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await review.remove();
    res.json({ msg: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;