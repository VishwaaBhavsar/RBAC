const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { verifyAccessToken: decodeJwtToken } = require('../utils/jwt');
const asyncHandler = require('./ApiMiddleware');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    throw new ApiError(401, 'Access token is required');
  }

  const decoded = decodeJwtToken(token);

  const user = await User.findById(decoded.sub).select('_id name email role');
  if (!user) {
    throw new ApiError(401, 'User no longer exists');
  }

  req.user = user;
  next();
});

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required'));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, 'You do not have permission to perform this action'));
  }

  return next();
};

module.exports = {
  authenticate,
  verifyToken: authenticate,
  authorizeRoles,
};
