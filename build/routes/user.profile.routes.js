"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _token = _interopRequireDefault(require("../middlewares/token.verify"));

var _userProfile = _interopRequireDefault(require("../controller/user-profile.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  userProfile,
  follow,
  unFollow,
  updatePhoto
} = _userProfile.default;

const profileRoute = _express.default.Router();

profileRoute.get('/userprofile/:id', _token.default, userProfile);
profileRoute.put('/follow', _token.default, follow);
profileRoute.put('/unfollow', _token.default, unFollow);
profileRoute.put('/updatephoto', _token.default, updatePhoto);
var _default = profileRoute;
exports.default = _default;