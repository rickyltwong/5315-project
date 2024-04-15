/******************************************************************************
 ITE5315 – Project
 I declare that this assignment is my own work in accordance with Humber Academic
 Policy.
 No part of this assignment has been copied manually or electronically from any other
 source
 (including web sites) or distributed to other students.
 Name: Ricky L. T. Wong Student ID: N01581738 Date: 2024-04-07
 ******************************************************************************/

// Import necessary libraries
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');

// Configure environment variables
dotenv.config();

const { join } = require('node:path');
const restaurantRouter = require('./routes/restaurantRoutes');
const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const restaurantDb = require('./services/restaurantDb');

const app = express();

// Middleware setup
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      dateFormat: function (date) {
        return new Date(date).toLocaleDateString();
      },
      eq: function (a, b) {
        return a === b;
      },
    },
  }),
);
app.set('view engine', '.hbs');
app.set('views', join(__dirname, 'views'));

app.use('/', viewRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(globalErrorHandler);

module.exports = async (req, res) => {
  try {
    await restaurantDb.initialize(process.env.DB_CONNECTION_STRING || '');
    app(req, res);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    res.status(500).send('Server error');
  }
};
