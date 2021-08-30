import React, { createContext } from 'react';

import useAuth from '../hooks/auth.hook.js';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const {
    authenticated, loading, handleLogin, handleLogout,
  } = useAuth();

  return (
    <AuthContext.Provider value={{ loading, authenticated, handleLogin, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
