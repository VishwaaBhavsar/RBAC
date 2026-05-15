import { ClipboardList, LogOut, Menu, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';

import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getInitials } from '../utils/formatters.js';

export default function DashboardLayout({ title, subtitle, children }) {
  const { user, logout, authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = (
    <aside className="flex h-full flex-col border-r border-line bg-white">
      <div className="flex h-16 items-center justify-between border-b border-line px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-black text-ink">RBAC</p>
            <p className="text-xs text-slate-500">Leave Policies</p>
          </div>
        </div>
        <button
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4">
        <div className="flex items-center gap-3 rounded-md bg-brand-50 px-3 py-3 text-brand-700">
          <ClipboardList className="h-5 w-5" />
          <span className="text-sm font-bold">Policies</span>
        </div>
      </nav>

      <div className="border-t border-line p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-black text-slate-700">
            {getInitials(user?.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.role}</p>
          </div>
        </div>
        <Button variant="secondary" loading={authLoading} onClick={logout} className="w-full">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[280px_1fr]">
      <div className="hidden lg:block">{sidebar}</div>

      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation overlay"
          />
          <div className="relative h-full w-72 max-w-[85vw]">{sidebar}</div>
        </div>
      ) : null}

      <main className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-xl font-black text-ink sm:text-2xl">{title}</h1>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
            <button
              className="rounded-md border border-line bg-white p-2 text-slate-600 shadow-sm lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
