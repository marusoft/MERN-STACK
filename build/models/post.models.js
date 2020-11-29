"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ObjectId
} = _mongoose.default.Schema.Types;
const postSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  comments: [{
    text: String,
    postedBy: {
      type: ObjectId,
      ref: 'User'
    }
  }],
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
});

_mongoose.default.model('Post', postSchema);