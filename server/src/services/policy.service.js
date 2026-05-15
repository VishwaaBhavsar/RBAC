const LeavePolicy = require('../models/LeavePolicy');
const ApiError = require('../utils/ApiError');
const { POLICY_STATUS } = require('../constants/roles');

const createPolicy = async (payload, createdBy) => {
  return LeavePolicy.create({
    ...payload,
    createdBy,
    status: POLICY_STATUS.PENDING,
  });
};

const updatePolicyStatus = async (policyId, status, approvedBy) => {
  const policy = await LeavePolicy.findById(policyId);
  if (!policy) {
    throw new ApiError(404, 'Leave policy not found');
  }

  // Manager decisions are auditable through approver and approval timestamp.
  policy.status = status;
  policy.approvedBy = approvedBy;
  policy.approvedAt = new Date();

  return policy.save();
};

const getApprovedPolicies = async () => {
  return LeavePolicy.find({ status: POLICY_STATUS.APPROVED })
    .populate('createdBy', 'name email role')
    .populate('approvedBy', 'name email role')
    .sort({ createdAt: -1 });
};

const getPendingPolicies = async () => {
  return LeavePolicy.find({ status: POLICY_STATUS.PENDING })
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 });
};

const getPoliciesCreatedBy = async (createdBy) => {
  return LeavePolicy.find({ createdBy })
    .populate('createdBy', 'name email role')
    .populate('approvedBy', 'name email role')
    .sort({ createdAt: -1 });
};

module.exports = {
  createPolicy,
  updatePolicyStatus,
  getApprovedPolicies,
  getPendingPolicies,
  getPoliciesCreatedBy,
};
