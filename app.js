import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';
import 'colors';
import './backend/models/user.models';
import './backend/models/post.models';

import userRouter from './backend/routes/user.routes';
import postRouter from './backend/routes/post.routes';
import profileRouter from './backend/routes/user.profile.routes';

const app = express();
const port = process.env.PORT || 4000;

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', userRouter);
app.use('/api/v1', postRouter);
app.use('/api/v1', profileRouter);

mongoose.Promise = Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to the database'.yellow.bold);
});

mongoose.connection.on('Error', (err) => {
  console.log('Unable to established database connection', err);
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Hello World, a place where beautiful things can be achieved through collaboration',
}));

app.listen(port, () => console.log(`Server running on port ${port} 🔥`.cyan.bold));
