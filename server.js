/* eslint-disable */
/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy. No part of this assignment has been copied manually or electronically from
 any other source (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const restaurantDb = require('./services/restaurantDb');

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...', err);
});

module.exports = async (req, res) => {
  try {
    await restaurantDb.initialize(process.env.DB_CONNECTION_STRING || "");
    app(req, res);
  } catch (error) {
    console.error('Failed to initialize database or handle the request:', error);
    res.status(500).send("Server error");
  }
};

process.on('unhandledRejection', err => {
  console.error('Unhandled rejection! Handling...', err);
});
