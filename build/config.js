"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config(); // eslint-disable-next-line import/no-mutable-exports


let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    mongoUri: process.env.DB_URL
  };
}

config = {
  mongoUri: process.env.URL,
  jwt_secret: process.env.SECRECT_KEY
};
var _default = config;
exports.default = _default;