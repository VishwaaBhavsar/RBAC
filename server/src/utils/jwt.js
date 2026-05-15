const jwt = require('jsonwebtoken');

const ApiError = require('./ApiError');

const getAccessTokenSecret = () => {
  const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET or JWT_SECRET is required');
  }

  return secret;
};

const getRefreshTokenSecret = () => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET or JWT_SECRET is required');
  }

  return secret;
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    getAccessTokenSecret(),
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || process.env.JWT_EXPIRES_IN || '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
    },
    getRefreshTokenSecret(),
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d' }
  );
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, getAccessTokenSecret());
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired access token');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, getRefreshTokenSecret());
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateToken: generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyToken: verifyAccessToken,
};
