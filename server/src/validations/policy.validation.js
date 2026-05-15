const Joi = require('joi');

const { POLICY_STATUS } = require('../constants/roles');

const createPolicySchema = Joi.object({
  title: Joi.string().trim().min(3).max(120).required(),
  description: Joi.string().trim().min(10).max(2000).required(),
});

const updatePolicyStatusSchema = Joi.object({
  status: Joi.string()
    .valid(POLICY_STATUS.APPROVED, POLICY_STATUS.REJECTED)
    .required(),
});

module.exports = {
  createPolicySchema,
  updatePolicyStatusSchema,
};

