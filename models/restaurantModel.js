const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  building: {
    type: String,
  },
  coord: {
    type: [Number],
    validate: {
      validator: (v) => Array.isArray(v) && v.length === 2,
      message: 'coord must be an array of 2 numbers (latitude and longitude)',
    },
  },
  street: {
    type: String,
  },
  zipcode: {
    type: String,
  },
});

const gradeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C'],
  },
  score: {
    type: Number,
  },
});

const restaurantSchema = new mongoose.Schema(
  {
    restaurant_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
    },
    borough: {
      type: String,
    },
    address: {
      type: addressSchema,
    },
    grades: {
      type: [gradeSchema],
    },
  },
  {
    collection: 'restaurants',
    toObject: { getters: true, virtuals: true, versionKey: false },
  },
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
