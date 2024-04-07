const express = require('express');
const { query, body, param } = require('express-validator');

const { isObjectIdOrHexString } = require('../middlewares/validate');

const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

router
  .route('/')
  .post(
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('restaurant_id')
        .not()
        .isEmpty()
        .withMessage('Restaurant ID is required'),
    ],
    restaurantController.addNewRestaurant,
  )
  .get(
    [
      query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer')
        .toInt(),
      query('perPage')
        .optional()
        .isInt({ min: 1 })
        .withMessage('PerPage must be a positive integer')
        .toInt(),
      query('borough').optional().escape(),
    ],
    restaurantController.getAllRestaurants,
  );

router
  .route('/:id')
  .all(
    param('id')
      .custom((id) => isObjectIdOrHexString(id))
      .withMessage('Invalid Object ID'),
  )
  .get(restaurantController.getRestaurantById)
  .put(restaurantController.updateRestaurantById)
  .delete(restaurantController.deleteRestaurantById);

module.exports = router;
