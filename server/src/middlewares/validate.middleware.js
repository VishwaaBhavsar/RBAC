const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return next(new ApiError(400, 'Validation failed', errors));
  }

  req.validatedBody = value;
  req.body = value;
  return next();
};

module.exports = validate;
