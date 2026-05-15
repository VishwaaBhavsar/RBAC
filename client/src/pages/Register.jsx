import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

import Alert from '../components/Alert.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import { ROLES, roleHomePath } from '../utils/constants.js';

export default function Register() {
  const { register, authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.EMPLOYEE,
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = await register(form);
      toast.success('Account created');
      navigate(roleHomePath[user.role] || '/login', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Choose a role and start with the matching workflow.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Alert message={error} />
        <FormField
          id="name"
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
        />
        <FormField id="role" name="role" label="Role" as="select" value={form.role} onChange={handleChange}>
          {Object.values(ROLES).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </FormField>
        <Button type="submit" loading={authLoading} className="w-full">
          Register
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already registered?{' '}
        <Link className="font-bold text-brand-600 hover:text-brand-700" to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
