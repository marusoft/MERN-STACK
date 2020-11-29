"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _mongoose.default.model('User');

const verifyUserToken = async (req, res, next) => {
  const {
    authorization
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: 'You must be logged in'
    });
  }

  const token = authorization.replace('Bearer ', '');

  _jsonwebtoken.default.verify(token, _config.default.jwt_secret, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: 'You must be logged in'
      });
    }

    const {
      _id
    } = payload;
    const userData = await User.findById(_id);
    req.user = userData;
    next();
  });
};

var _default = verifyUserToken;
exports.default = _default;