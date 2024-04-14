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
const { body } = require('express-validator');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', authController.isLoggedIn, viewController.renderLoginForm);
router.get(
  '/profile',
  authController.protect,
  viewController.renderProfilePage,
);

router
  .route('/restaurants')
  .get(authController.protect, viewController.renderRestaurantSearchForm)
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
