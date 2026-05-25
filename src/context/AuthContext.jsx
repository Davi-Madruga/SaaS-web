import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/api/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await authService.loadCurrentUser();
        setUser(currentUser);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(credentials) {
    const loggedUser = await authService.login(credentials);
    setUser(loggedUser);
    return loggedUser;
  }

  async function register(data) {
    return authService.register(data);
  }

  function logout() {
    authService.logout();
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
