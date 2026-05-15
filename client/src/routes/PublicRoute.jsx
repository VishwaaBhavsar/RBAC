import { Navigate } from 'react-router-dom';

import FullPageLoader from '../components/FullPageLoader.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { roleHomePath } from '../utils/constants.js';

export default function PublicRoute({ children }) {
  const { user, initializing } = useAuth();

  if (initializing) {
    return <FullPageLoader label="Loading workspace" />;
  }

  if (user) {
    return <Navigate to={roleHomePath[user.role] || '/login'} replace />;
  }

  return children;
}
