import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-200',
  secondary: 'bg-white text-slate-700 border border-line hover:bg-slate-50 focus:ring-slate-200',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-200',
};

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
