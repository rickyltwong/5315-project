/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

const { isObjectIdOrHexString } = require('mongoose');
const { body, query, param } = require('express-validator');

const validateNewRestaurant = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('restaurant_id')
    .not()
    .isEmpty()
    .withMessage('Restaurant ID is required'),
];

const validatePagination = [
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
];

const validateObjectId = [
  param('id')
    .custom((id) => isObjectIdOrHexString(id))
    .withMessage('Invalid Object ID'),
];

module.exports = {
  validateNewRestaurant,
  validatePagination,
  validateObjectId,
};
