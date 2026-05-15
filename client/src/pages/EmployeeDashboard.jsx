import { getPolicies } from '../api/policies.js';
import PolicyList from '../components/PolicyList.jsx';
import usePolicies from '../hooks/usePolicies.js';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

export default function EmployeeDashboard() {
  const { policies, loading, error } = usePolicies(getPolicies);

  return (
    <DashboardLayout title="Employee Dashboard" subtitle="Browse currently approved leave policies.">
      <div className="mb-4">
        <h2 className="text-lg font-black text-ink">Approved leave policies</h2>
        <p className="text-sm text-slate-500">These policies have completed manager review.</p>
      </div>
      <PolicyList
        policies={policies}
        loading={loading}
        error={error}
        emptyTitle="No approved policies available"
        emptyDescription="Approved leave policies will be listed here when HR and managers complete the workflow."
      />
    </DashboardLayout>
  );
}
