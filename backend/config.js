import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/no-mutable-exports
let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    mongoUri: process.env.DB_URL,
  };
}
config = {
  mongoUri: process.env.URL,
  jwt_secret: process.env.SECRECT_KEY,
};

export default config;
