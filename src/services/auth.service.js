const crypto = require('crypto');

const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

const issueTokens = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshTokenHash = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const register = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new ApiError(409, 'Email already registered');
  }

  const user = await User.create(payload);
  const tokens = await issueTokens(user);

  return { user, ...tokens };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password +refreshTokenHash');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = await issueTokens(user);
  user.password = undefined;
  user.refreshTokenHash = undefined;

  return { user, ...tokens };
};

const refreshTokens = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.sub).select('+refreshTokenHash');
  if (!user || !user.refreshTokenHash) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  if (user.refreshTokenHash !== hashToken(refreshToken)) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const tokens = await issueTokens(user);
  user.refreshTokenHash = undefined;

  return { user, ...tokens };
};

const logout = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    await User.findByIdAndUpdate(decoded.sub, { $unset: { refreshTokenHash: 1 } });
  } catch (error) {
    return;
  }
};

module.exports = {
  register,
  login,
  refreshTokens,
  logout,
};
