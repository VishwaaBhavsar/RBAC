import { ShieldCheck } from 'lucide-react';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen bg-mist lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden bg-ink px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-lg font-bold">RBAC Leave Policy</span>
        </div>
        <div>
          <p className="max-w-lg text-4xl font-black leading-tight">
            Role-aware leave policy approvals for HR, managers, and employees.
          </p>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Secure cookie authentication, clear policy workflows, and focused dashboards for every role.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md rounded-lg border border-line bg-white p-6 shadow-soft sm:p-8">
          <div className="mb-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600 lg:hidden">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-black text-ink">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
