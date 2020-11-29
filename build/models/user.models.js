"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ObjectId
} = _mongoose.default.Schema.Types;
const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  photo: {
    type: String,
    default: 'https://res.cloudinary.com/marusofteamwork/image/upload/v1606332287/No_Image_Available_s2hxem.png'
  },
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  following: [{
    type: ObjectId,
    ref: 'User'
  }]
});

_mongoose.default.model('User', userSchema);