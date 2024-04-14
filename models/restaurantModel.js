/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

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
    likes: {
      type: [String],
    },
  },
  {
    collection: 'restaurants',
    toObject: { getters: true, virtuals: true, versionKey: false },
  },
);

restaurantSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
