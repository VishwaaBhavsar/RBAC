const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middlewares/ApiMiddleware');

const parseDurationMs = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  const match = /^(\d+)(ms|s|m|h|d)?$/.exec(value);
  if (!match) {
    return fallback;
  }

  const amount = Number(match[1]);
  const unit = match[2] || 'ms';
  const multipliers = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
};

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge,
});

const setAuthCookies = (res, { accessToken, refreshToken }) => {
  res.cookie(
    'accessToken',
    accessToken,
    cookieOptions(parseDurationMs(process.env.ACCESS_TOKEN_EXPIRES_IN || process.env.JWT_EXPIRES_IN, 15 * 60 * 1000))
  );
  res.cookie(
    'refreshToken',
    refreshToken,
    cookieOptions(parseDurationMs(process.env.REFRESH_TOKEN_EXPIRES_IN, 7 * 24 * 60 * 60 * 1000))
  );
};

const clearAuthCookies = (res) => {
  res.clearCookie('accessToken', cookieOptions(0));
  res.clearCookie('refreshToken', cookieOptions(0));
};

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.validatedBody);
  setAuthCookies(res, result);

  res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.validatedBody);
  setAuthCookies(res, result);

  res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const result = await authService.refreshTokens(token);
  setAuthCookies(res, result);

  res.status(200).json(new ApiResponse(200, result, 'Token refreshed successfully'));
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.cookies?.refreshToken);
  clearAuthCookies(res);

  res.status(200).json(new ApiResponse(200, null, 'Logout successful'));
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'Authenticated user fetched'));
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
};
