/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

const { validationResult } = require('express-validator');
const restaurantDb = require('../services/restaurantDb');

const addNewRestaurant = async (req, res) => {
  try {
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.status(400).json({ errors: results.array() });
    }
    const newRestaurant = await restaurantDb.addNewRestaurant(req.body);
    res.status(201).json({
      status: 'success',
      data: newRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { page = 1, perPage = 5, borough } = req.query;

    const results = await restaurantDb.getAllRestaurants(
      page,
      perPage,
      borough,
    );
    res.status(200).json({
      status: 'success',
      results: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const restaurant = await restaurantDb.getRestaurantById(req.params.id);
    if (restaurant) {
      res.status(200).json({
        status: 'success',
        data: restaurant,
      });
    } else {
      res.status(404).json({ error: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRestaurantById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updatedRestaurant = await restaurantDb.updateRestaurantById(
      req.params.id,
      req.body,
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.status(200).json({
      status: 'success',
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRestaurantById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const deletedRestaurant = await restaurantDb.deleteRestaurantById(
      req.params.id,
    );

    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // 204 is not used here because the response should include a message
    res.status(200).json({
      status: 'success',
      message: 'Restaurant deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addLikeRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    console.log('restaurantId:', restaurantId, 'userId:', req.user.id);
    if (!restaurantId) {
      return res.status(400).json({ message: 'Restaurant ID is required' });
    }

    let restaurant = await restaurantDb.getRestaurantById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const likeList = restaurant.likes || [];

    if (likeList.includes(req.user.id)) {
      return res
        .status(204)
        .json({ message: 'User has already liked this restaurant' });
    }

    restaurant = await restaurantDb.pushUserIdToLikes(
      restaurantId,
      req.user.id,
    );

    res.status(200).json({
      status: 'success',
      data: restaurant.likesCount,
    });
  } catch (err) {
    console.error('Error liking restaurant:', err);
    res.status(500).json({ message: 'Error processing your request' });
  }
};

module.exports = {
  addNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  addLikeRestaurant,
};
