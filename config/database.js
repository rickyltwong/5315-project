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
