/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

const express = require('express');

const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authController = require('../controllers/authController');
const {
  validateNewRestaurant,
  validatePagination,
  validateObjectId,
} = require('../middlewares/validations');

router
  .route('/')
  .post(
    authController.protect,
    validateNewRestaurant,
    restaurantController.addNewRestaurant,
  )
  .get(
    authController.protect,
    validatePagination,
    restaurantController.getAllRestaurants,
  );

router
  .route('/:id')
  .all(authController.protect, validateObjectId)
  .get(restaurantController.getRestaurantById)
  .put(restaurantController.updateRestaurantById)
  .delete(restaurantController.deleteRestaurantById);

router.post(
  '/:id/like',
  authController.protect,
  restaurantController.addLikeRestaurant,
);

module.exports = router;
