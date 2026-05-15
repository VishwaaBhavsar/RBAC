const express = require('express');

const policyController = require('../controllers/policy.controller');
const { authenticate, authorizeRoles } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { ROLES } = require('../constants/roles');
const {
  createPolicySchema,
  updatePolicyStatusSchema,
} = require('../validations/policy.validation');

const router = express.Router();

router.use(authenticate);

router.post(
  '/',
  authorizeRoles(ROLES.HR),
  validate(createPolicySchema),
  policyController.createPolicy
);

router.get('/mine', authorizeRoles(ROLES.HR), policyController.getMyPolicies);

router.get('/pending', authorizeRoles(ROLES.MANAGER), policyController.getPendingPolicies);

router.patch(
  '/:id/status',
  authorizeRoles(ROLES.MANAGER),
  validate(updatePolicyStatusSchema),
  policyController.updatePolicyStatus
);

router.get(
  '/',
  authorizeRoles(ROLES.EMPLOYEE, ROLES.HR, ROLES.MANAGER),
  policyController.getApprovedPolicies
);

module.exports = router;
