import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';
import { roleHomePath } from '../utils/constants.js';

export default function NotFound() {
  const { user } = useAuth();
  const destination = user ? roleHomePath[user.role] : '/login';

  return (
    <main className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold uppercase tracking-wider text-brand-600">404</p>
        <h1 className="mt-2 text-2xl font-black text-ink">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">The route you opened does not exist in this workspace.</p>
        <Link
          to={destination}
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-4 focus:ring-brand-200"
        >
          Go back
        </Link>
      </div>
    </main>
  );
}
