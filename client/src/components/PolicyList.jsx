import Alert from './Alert.jsx';
import EmptyState from './EmptyState.jsx';
import PolicyCard from './PolicyCard.jsx';
import PolicySkeleton from './PolicySkeleton.jsx';

export default function PolicyList({
  policies,
  loading,
  error,
  emptyTitle,
  emptyDescription,
  onApprove,
  onReject,
  actionLoading,
}) {
  if (loading) {
    return (
      <div className="grid gap-4">
        <PolicySkeleton />
        <PolicySkeleton />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} />;
  }

  if (!policies.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid gap-4">
      {policies.map((policy) => (
        <PolicyCard
          key={policy._id}
          policy={policy}
          onApprove={onApprove}
          onReject={onReject}
          actionLoading={actionLoading}
        />
      ))}
    </div>
  );
}
