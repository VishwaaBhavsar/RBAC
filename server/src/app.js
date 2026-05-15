const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth.routes');
const policyRoutes = require('./routes/policy.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');
const openapiSpec = require('./docs/openapi');

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

if (process.env.SWAGGER_ENABLED !== 'false') {
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(openapiSpec);
  });

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, { explorer: true }));
}

app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
