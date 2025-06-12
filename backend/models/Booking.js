const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // could be 'pending', 'confirmed', etc.
});

// Prevent double-booking: One booking per user per tour per bookingDate
bookingSchema.index({ user: 1, tour: 1, bookingDate: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);