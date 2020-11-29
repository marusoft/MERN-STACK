"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const validateUserSignup = (req, res, next) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'user credentials cannot be empty'
    });
  }

  next();
};

const validateUserSignin = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    res.status(422).json({
      error: 'Either email or password incorrect'
    });
  }

  next();
};

var _default = {
  validateUserSignup,
  validateUserSignin
};
exports.default = _default;