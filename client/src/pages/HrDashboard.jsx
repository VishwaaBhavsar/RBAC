import { PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { createPolicy, getMyPolicies, getPolicies } from '../api/policies.js';
import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import PolicyList from '../components/PolicyList.jsx';
import usePolicies from '../hooks/usePolicies.js';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { getApiErrorMessage } from '../api/axios.js';

export default function HrDashboard() {
  const { policies, loading, error, reload } = usePolicies(getPolicies);
  const {
    policies: submittedPolicies,
    loading: submittedLoading,
    error: submittedError,
    reload: reloadSubmitted,
  } = usePolicies(getMyPolicies);
  const [form, setForm] = useState({ title: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      await createPolicy(form);
      setForm({ title: '', description: '' });
      toast.success('Policy sent for manager approval');
      reload();
      reloadSubmitted();
    } catch (err) {
      setFormError(getApiErrorMessage(err, 'Unable to create policy'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="HR Dashboard" subtitle="Create policies, track approval status, and monitor approved leave policy records.">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-600">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-ink">Create leave policy</h2>
              <p className="text-sm text-slate-500">New policies are created as pending.</p>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Alert message={formError} />
            <FormField
              id="title"
              name="title"
              label="Policy title"
              placeholder="Annual leave policy"
              value={form.title}
              onChange={handleChange}
              minLength={3}
              maxLength={120}
              required
            />
            <FormField
              id="description"
              name="description"
              label="Description"
              as="textarea"
              rows={7}
              placeholder="Describe eligibility, duration, and rules"
              value={form.description}
              onChange={handleChange}
              minLength={10}
              maxLength={2000}
              required
            />
            <Button type="submit" loading={submitting} className="w-full">
              Create Policy
            </Button>
          </form>
        </section>

        <div className="grid gap-6">
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-black text-ink">Your submitted policies</h2>
              <p className="text-sm text-slate-500">Track the approval status of policies you have sent to managers.</p>
            </div>
            <PolicyList
              policies={submittedPolicies}
              loading={submittedLoading}
              error={submittedError}
              emptyTitle="No submitted policies yet"
              emptyDescription="Create a policy to send it for manager approval."
            />
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-black text-ink">Approved policies</h2>
              <p className="text-sm text-slate-500">Policies visible to employees after manager approval.</p>
            </div>
            <PolicyList
              policies={policies}
              loading={loading}
              error={error}
              emptyTitle="No approved policies yet"
              emptyDescription="Created policies will appear here after a manager approves them."
            />
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
