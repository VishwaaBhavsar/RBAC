import { CalendarDays, CheckCircle2, Clock3, UserRound, XCircle } from 'lucide-react';

import { POLICY_STATUS } from '../utils/constants.js';
import { formatDate } from '../utils/formatters.js';
import Button from './Button.jsx';

const statusStyles = {
  [POLICY_STATUS.PENDING]: 'bg-amber-50 text-amber-700 ring-amber-200',
  [POLICY_STATUS.APPROVED]: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  [POLICY_STATUS.REJECTED]: 'bg-rose-50 text-rose-700 ring-rose-200',
};

const statusIcons = {
  [POLICY_STATUS.PENDING]: Clock3,
  [POLICY_STATUS.APPROVED]: CheckCircle2,
  [POLICY_STATUS.REJECTED]: XCircle,
};

export default function PolicyCard({ policy, onApprove, onReject, actionLoading }) {
  const StatusIcon = statusIcons[policy.status] || Clock3;

  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink">{policy.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{policy.description}</p>
        </div>
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusStyles[policy.status] || statusStyles.PENDING}`}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {policy.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 border-t border-line pt-4 text-sm text-slate-500 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-slate-400" />
          <span>Created by {policy.createdBy?.name || 'HR'}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <span>{formatDate(policy.createdAt)}</span>
        </div>
        {policy.approvedBy ? (
          <div className="flex items-center gap-2 sm:col-span-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>
              Reviewed by {policy.approvedBy.name} on {formatDate(policy.approvedAt)}
            </span>
          </div>
        ) : null}
      </div>

      {onApprove || onReject ? (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="success"
            loading={actionLoading === `${policy._id}-APPROVED`}
            disabled={Boolean(actionLoading)}
            onClick={() => onApprove(policy._id)}
            className="sm:w-auto"
          >
            Approve
          </Button>
          <Button
            variant="danger"
            loading={actionLoading === `${policy._id}-REJECTED`}
            disabled={Boolean(actionLoading)}
            onClick={() => onReject(policy._id)}
            className="sm:w-auto"
          >
            Reject
          </Button>
        </div>
      ) : null}
    </article>
  );
}
