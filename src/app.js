const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const policyRoutes = require('./routes/policy.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

const parseCookies = (req, res, next) => {
  req.cookies = {};

  if (!req.headers.cookie) {
    return next();
  }

  req.headers.cookie.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split('=');
    if (!name) {
      return;
    }

    req.cookies[name] = decodeURIComponent(rest.join('='));
  });

  return next();
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(parseCookies);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'RBAC Leave Policy API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
