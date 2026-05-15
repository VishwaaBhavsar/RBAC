import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import { roleHomePath } from '../utils/constants.js';

export default function Login() {
  const { login, authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = await login(form);
      toast.success('Welcome back');
      navigate(location.state?.from?.pathname || roleHomePath[user.role] || '/login', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Use your account to continue to the right dashboard.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Alert message={error} />
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" loading={authLoading} className="w-full">
          Login
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New here?{' '}
        <Link className="font-bold text-brand-600 hover:text-brand-700" to="/register">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
