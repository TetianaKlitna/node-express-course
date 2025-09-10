const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const requireAuth = async (req, res, next) => {
  const authData = req.headers.authorization;
  if (!authData || !authData.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Please provide Authorization Data');
  }
  const token = authData.split(' ')[1];
  if (!token) {
    throw new UnauthenticatedError('Please provide Token');
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decodedToken.id,
      name: decodedToken.username,
    };
    next();
  } catch (error) {
    console.error(error);
    throw new UnauthenticatedError('Please provide Valid Token');
  }
};

module.exports = requireAuth;
