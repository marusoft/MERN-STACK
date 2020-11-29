"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _config = _interopRequireDefault(require("./config"));

require("colors");

require("./models/user.models");

require("./models/post.models");

var _user2 = _interopRequireDefault(require("./routes/user.routes"));

var _post2 = _interopRequireDefault(require("./routes/post.routes"));

var _userProfile = _interopRequireDefault(require("./routes/user.profile.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const port = process.env.PORT || 4000;
app.use((0, _morgan.default)('dev'));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use('/api/v1', _user2.default);
app.use('/api/v1', _post2.default);
app.use('/api/v1', _userProfile.default);
_mongoose.default.Promise = Promise;

_mongoose.default.connect(_config.default.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

_mongoose.default.connection.on('connected', () => {
  console.log('Successfully connected to the database'.yellow.bold);
});

_mongoose.default.connection.on('Error', err => {
  console.log('Unable to established database connection', err);
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Hello World, a place where beautiful things can be achieved through collaboration'
}));
app.listen(port, () => console.log(`Server running on port ${port} 🔥`.cyan.bold));