export default function FormField({ label, id, error, as = 'input', className = '', ...props }) {
  const Component = as;

  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <Component
        id={id}
        className={`mt-2 w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}
