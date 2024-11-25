const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret_key';

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

module.exports = { jwtSecret, generateToken };
