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
const restaurantDb = require('../config/database');

const renderRestaurantSearchForm = async (req, res) => {
  res.render('searchForm', {
    title: 'Search for Restaurant',
    showResults: false,
    page: 1,
    perPage: 5,
    borough: 'Manhattan',
  });
};

const renderRestaurantSearchResults = async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return res.status(400).json({ errors: results.array() });
  }

  try {
    const page = req.body.page || 1;
    const perPage = req.body.perPage || 5;
    const borough = req.body.borough || '';

    const searchResults = await restaurantDb.getAllRestaurants(
      page,
      perPage,
      borough,
    );

    const searchResultsObj = searchResults.map((doc) => doc.toObject());

    res.render('searchForm', {
      searchResultsObj,
      showResults: true,
      page,
      perPage,
      borough,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  renderRestaurantSearchForm,
  renderRestaurantSearchResults,
};
