//C:\Users\USER\ceylon-escape\backend\models\Tour.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // URL or filename
  date: Date,
  createdAt: { type: Date, default: Date.now },
  ratingsAverage: {type: Number,default: 4.5,min: 1,max: 5,set: val => Math.round(val * 10) / 10 },
  ratingsQuantity: {type: Number,default: 0}
});

module.exports = mongoose.model('Tour', tourSchema);