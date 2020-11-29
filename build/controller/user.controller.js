"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const User = _mongoose.default.model('User');

const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    photo
  } = req.body;

  try {
    const savedUser = await User.findOne({
      email
    });

    if (savedUser) {
      return res.status(422).json({
        error: `User with ${savedUser.email} already exist, please login`
      });
    }

    const hashpassword = await _bcryptjs.default.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashpassword,
      photo
    });
    await user.save();
    return res.status(201).json({
      message: `${user.email} account successfully created`
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  try {
    const userExist = await User.findOne({
      email
    });

    if (!userExist) {
      return res.status(422).json({
        error: 'email or pasword incorrect'
      });
    }

    const comparePassword = await _bcryptjs.default.compare(password, userExist.password);

    if (comparePassword) {
      const token = _jsonwebtoken.default.sign({
        _id: userExist._id
      }, _config.default.jwt_secret);

      const {
        _id,
        name,
        followers,
        following,
        photo
      } = userExist;
      return res.status(200).json({
        token,
        user: {
          _id,
          name,
          email,
          followers,
          following,
          photo
        },
        message: `${userExist.email} successfully signed in`
      });
    }

    return res.status(422).json({
      error: 'email or pasword incorrect'
    });
  } catch (error) {
    console.log(error);
  }
};

var _default = {
  createUser,
  loginUser
};
exports.default = _default;