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
const Restaurant = require('../models/restaurantModel');

const restaurantDb = {
  initialize: async (connectionString) => {
    await mongoose.connect(connectionString);
  },

  addNewRestaurant: async (data) => await Restaurant.create(data),

  getAllRestaurants: async (page, perPage, borough) =>
    await Restaurant.find(borough ? { borough } : {})
      .sort({ restaurant_id: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec(),

  getRestaurantById: async (id) => await Restaurant.findById(id).exec(),

  updateRestaurantById: async (id, data) =>
    await Restaurant.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true },
    ).exec(),

  deleteRestaurantById: async (id) =>
    await Restaurant.findByIdAndDelete(id).exec(),
};

module.exports = restaurantDb;
