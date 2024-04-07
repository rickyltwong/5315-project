const express = require('express');
const { body } = require('express-validator');
const viewController = require('../controllers/viewController');

const router = express.Router();

router
  .route('/restaurants')
  .get(viewController.renderRestaurantSearchForm)
  .post(
    [
      body('page')
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer')
        .toInt(),
      body('perPage')
        .isInt({ min: 1 })
        .withMessage('PerPage must be a positive integer')
        .toInt(),
      body('borough').escape(),
    ],
    viewController.renderRestaurantSearchResults,
  );

module.exports = router;
