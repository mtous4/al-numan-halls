'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getUserByCredentials, initializeData } from '@/lib/data';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeData();
    const stored = localStorage.getItem('alnuman_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const found = getUserByCredentials(username, password);
    if (found) {
      const sessionUser = {
        id: found.id,
        name: found.name,
        username: found.username,
        role: found.role,
        invitationId: found.invitationId,
      };
      setUser(sessionUser);
      localStorage.setItem('alnuman_session', JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }
    return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alnuman_session');
  };

  const isAdmin = user?.role === 'admin';
  const isCustomer = user?.role === 'customer';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, isCustomer, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: () => ({ success: false }),
      logout: () => {},
      loading: false,
      isAdmin: false,
      isCustomer: false,
      isAuthenticated: false
    };
  }
  return context;
}
