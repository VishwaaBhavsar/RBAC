import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { getCurrentUser, loginUser, logoutUser, registerUser } from '../api/auth.js';
import { getApiErrorMessage } from '../api/axios.js';

const AuthContext = createContext(null);

const normalizeUser = (payload) => payload?.user || payload || null;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const refreshUser = useCallback(async () => {
    const payload = await getCurrentUser();
    const currentUser = normalizeUser(payload);
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      try {
        const payload = await getCurrentUser();
        if (isMounted) {
          setUser(normalizeUser(payload));
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setInitializing(false);
        }
      }
    };

    bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      await loginUser(credentials);
      return await refreshUser();
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Login failed'));
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (values) => {
    setAuthLoading(true);
    try {
      await registerUser(values);
      return await refreshUser();
    } catch (error) {
      throw new Error(getApiErrorMessage(error, 'Registration failed'));
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setAuthLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      initializing,
      authLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [authLoading, initializing, refreshUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};
