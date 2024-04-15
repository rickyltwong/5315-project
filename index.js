/* eslint-disable */
/*
 * This file is the entry point for serverless deployment (like vercel), the server is not started in this file.
 */
/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const restaurantDb = require('./services/restaurantDb');

restaurantDb.initialize(process.env.DB_CONNECTION_STRING || "")
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((error) => {
    console.error('Failed to initialize database or start the server:', error);
  });

process.on('unhandledRejection', err => {
  console.log('Unhandled rejection! Shutting down...', err);
});

module.exports = app;