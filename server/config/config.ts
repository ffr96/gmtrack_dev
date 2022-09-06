require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const perPage = 5;

export default {
  PORT,
  MONGODB_URI,
  SECRET,
  perPage,
};
