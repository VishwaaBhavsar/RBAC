import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import HrDashboard from './pages/HrDashboard.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { ROLES } from './utils/constants.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: '/hr',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.HR]}>
        <HrDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/manager',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.MANAGER]}>
        <ManagerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/employee',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.EMPLOYEE]}>
        <EmployeeDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
