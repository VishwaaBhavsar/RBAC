export default function PolicySkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex justify-between gap-4">
        <div className="h-5 w-48 rounded bg-slate-200" />
        <div className="h-6 w-24 rounded-full bg-slate-200" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-4/5 rounded bg-slate-200" />
      </div>
      <div className="mt-6 h-3 w-64 rounded bg-slate-200" />
    </div>
  );
}
