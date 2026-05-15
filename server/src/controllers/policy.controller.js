const policyService = require('../services/policy.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../middlewares/ApiMiddleware');

const createPolicy = asyncHandler(async (req, res) => {
  const policy = await policyService.createPolicy(req.validatedBody, req.user._id);

  res.status(201).json(new ApiResponse(201, policy, 'Leave policy created and marked as pending'));
});

const updatePolicyStatus = asyncHandler(async (req, res) => {
  const policy = await policyService.updatePolicyStatus(
    req.params.id,
    req.validatedBody.status,
    req.user._id
  );

  res.status(200).json(new ApiResponse(200, policy, 'Leave policy status updated'));
});

const getApprovedPolicies = asyncHandler(async (req, res) => {
  const policies = await policyService.getApprovedPolicies();

  res.status(200).json(new ApiResponse(200, policies, 'Approved leave policies fetched'));
});

const getPendingPolicies = asyncHandler(async (req, res) => {
  const policies = await policyService.getPendingPolicies();

  res.status(200).json(new ApiResponse(200, policies, 'Pending leave policies fetched'));
});

const getMyPolicies = asyncHandler(async (req, res) => {
  const policies = await policyService.getPoliciesCreatedBy(req.user._id);

  res.status(200).json(new ApiResponse(200, policies, 'Submitted leave policies fetched'));
});

module.exports = {
  createPolicy,
  updatePolicyStatus,
  getApprovedPolicies,
  getPendingPolicies,
  getMyPolicies,
};
