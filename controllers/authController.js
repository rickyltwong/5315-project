const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    // expiresIn: process.env.JWT_EXPIRES_IN,
  });

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // for testing purposes
      if (err instanceof JsonWebTokenError) {
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid token. Please clear your cookies and log in again.',
        });
      }

      return next();
    }
  }

  next();
};

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (err) {
    // for testing purposes
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid token. Please log in again.',
      });
    }

    return next();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password!',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  const token = signToken(user._id);

  res.cookie('jwt', token, {
    // expires: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    // ),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  user.password = undefined;

  // redirect to /restaurants
  // return res.redirect('/restaurants');

  res.status(200).json({
    status: 'success',
    token,
  });
};

const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

module.exports = {
  isLoggedIn,
  protect,
  login,
  logout,
};
