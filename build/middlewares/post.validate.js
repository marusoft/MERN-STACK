"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const validatePost = (req, res, next) => {
  const {
    title,
    body,
    pic
  } = req.body;

  if (!title || !body || !pic) {
    return res.status(422).json({
      error: 'Please supply all the fields'
    });
  }

  next();
};

var _default = validatePost;
exports.default = _default;