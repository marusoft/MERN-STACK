"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../middlewares/user.validate"));

var _user2 = _interopRequireDefault(require("../controller/user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
const {
  validateUserSignup,
  validateUserSignin
} = _user.default;
const {
  createUser,
  loginUser
} = _user2.default;

const userRoute = _express.default.Router();

userRoute.post('/signup', validateUserSignup, createUser);
userRoute.post('/signin', validateUserSignin, loginUser);
var _default = userRoute;
exports.default = _default;