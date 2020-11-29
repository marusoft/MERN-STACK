"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */

/* eslint-disable no-underscore-dangle */
const Post = _mongoose.default.model('Post');

const User = _mongoose.default.model('User');

const userProfile = async (req, res) => {
  try {
    const findUser = await User.findOne({
      _id: req.params.id
    }).select('-password');
    const findUserPost = await Post.find({
      postedBy: req.params.id
    }).populate('postedBy', '_id name').exec(async (err, posts) => {
      if (err) {
        return res.status(422).json({
          error: err
        });
      }

      return res.status(200).json({
        findUser,
        posts,
        findUserPost
      });
    });
  } catch (error) {
    return res.status(404).json({
      error: 'User not found'
    });
  }
};

const follow = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const userFollower = await User.findByIdAndUpdate(req.body.followId, {
      $push: {
        followers: req.user._id
      }
    }, {
      new: true
    });
    const userFollowerDetails = await User.findByIdAndUpdate(req.user._id, {
      $push: {
        following: req.body.followId
      }
    }, {
      new: true
    }).select('-password');
    return res.status(200).json(userFollowerDetails);
  } catch (e) {
    console.log(e);
  }
};

const unFollow = async (req, res) => {
  try {
    const userUnFollower = await User.findByIdAndUpdate(req.body.unfollowId, {
      $pull: {
        followers: req.user._id
      }
    }, {
      new: true
    });
    const userUnFollowerDetails = await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        following: req.body.unfollowId
      }
    }, {
      new: true
    }).select('-password');
    return res.status(200).json(userUnFollowerDetails);
  } catch (e) {
    console.log(e);
  }
};

const updatePhoto = async (req, res) => {
  try {
    const updateUserPhoto = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        photo: req.body.photo
      }
    }, {
      new: true
    }, async (err, result) => {
      console.log(result);

      if (err) {
        return res.status(422).json({
          error: 'Unable to update photo'
        });
      }

      return res.json(result);
    }); // console.log(result);
  } catch (e) {
    console.log(e);
  }
};

var _default = {
  userProfile,
  follow,
  unFollow,
  updatePhoto
};
exports.default = _default;