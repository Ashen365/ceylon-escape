//C:\Users\USER\ceylon-escape\backend\models\Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
    tour: {type: mongoose.Schema.Types.ObjectId,ref: 'Tour',required: true},
    rating: {type: Number,required: true,min: 1,max: 5},
    comment: {type: String,required: true}
  },
  { timestamps: true }
);

// Static method to calculate average rating and quantity for a tour
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    // No reviews left
    await mongoose.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5 // Default value, adjust if needed
    });
  }
};

// Call aggregation after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.tour);
});

// Call aggregation after update/delete
// For findByIdAndUpdate, findByIdAndDelete, etc.
reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.tour);
  }
});

module.exports = mongoose.model('Review', reviewSchema);