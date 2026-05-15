import { Navigate, useLocation } from 'react-router-dom';

import FullPageLoader from '../components/FullPageLoader.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { roleHomePath } from '../utils/constants.js';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <FullPageLoader label="Checking your session" />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={roleHomePath[user.role] || '/login'} replace />;
  }

  return children;
}
