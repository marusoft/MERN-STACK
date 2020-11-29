"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _token = _interopRequireDefault(require("../middlewares/token.verify"));

var _post = _interopRequireDefault(require("../middlewares/post.validate"));

var _post2 = _interopRequireDefault(require("../controller/post.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const {
  createPost,
  getAllPost,
  userPost,
  likePost,
  unLikePost,
  commentPost,
  deletePost,
  getUserFollowingPost
} = _post2.default;

const postRoute = _express.default.Router();

postRoute.get('/posts', _token.default, getAllPost);
postRoute.get('/userfollowingposts', _token.default, getUserFollowingPost);
postRoute.post('/createpost', _post.default, _token.default, createPost);
postRoute.get('/userpost', _token.default, userPost);
postRoute.put('/likepost', _token.default, likePost);
postRoute.put('/unlikepost', _token.default, unLikePost);
postRoute.put('/commentpost', _token.default, commentPost);
postRoute.delete('/deletepost/:postId', _token.default, deletePost);
var _default = postRoute;
exports.default = _default;