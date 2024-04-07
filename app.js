const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');

const restaurantRouter = require('./routes/restaurantRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/', viewRouter);
app.use('/api/restaurants', restaurantRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
