import { toast } from 'react-toastify';
import { useState } from 'react';

import { getPendingPolicies, updatePolicyStatus } from '../api/policies.js';
import PolicyList from '../components/PolicyList.jsx';
import usePolicies from '../hooks/usePolicies.js';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { POLICY_STATUS } from '../utils/constants.js';
import { getApiErrorMessage } from '../api/axios.js';

export default function ManagerDashboard() {
  const { policies, setPolicies, loading, error } = usePolicies(getPendingPolicies);
  const [actionLoading, setActionLoading] = useState('');

  const decidePolicy = async (id, status) => {
    setActionLoading(`${id}-${status}`);

    try {
      await updatePolicyStatus(id, status);
      setPolicies((current) => current.filter((policy) => policy._id !== id));
      toast.success(`Policy ${status.toLowerCase()}`);
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Unable to update policy'));
    } finally {
      setActionLoading('');
    }
  };

  return (
    <DashboardLayout title="Manager Dashboard" subtitle="Review pending policies and make approval decisions.">
      <div className="mb-4">
        <h2 className="text-lg font-black text-ink">Pending approvals</h2>
        <p className="text-sm text-slate-500">Approved policies become visible in employee dashboards.</p>
      </div>
      <PolicyList
        policies={policies}
        loading={loading}
        error={error}
        emptyTitle="No policies waiting for approval"
        emptyDescription="When HR creates a policy, it will show up here for your decision."
        onApprove={(id) => decidePolicy(id, POLICY_STATUS.APPROVED)}
        onReject={(id) => decidePolicy(id, POLICY_STATUS.REJECTED)}
        actionLoading={actionLoading}
      />
    </DashboardLayout>
  );
}
