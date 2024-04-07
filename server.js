/* eslint-disable */
/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/


const dotenv = require('dotenv');

dotenv.config();

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const app = require('./app');
const restaurantDb = require('./config/database');
const PORT = process.env.PORT || 3000;

const main = async () => {
  await restaurantDb.initialize(process.env.DB_CONNECTION_STRING || "");
  console.log('Database initialized successfully');

  return app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on port ${PORT}`);
  });
};

const server = main().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
