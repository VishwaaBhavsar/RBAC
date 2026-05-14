const mongoose = require('mongoose');

const { POLICY_STATUS } = require('../constants/roles');

const leavePolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: POLICY_STATUS.PENDING,
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

leavePolicySchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('LeavePolicy', leavePolicySchema);
