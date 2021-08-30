import { useState, useEffect } from 'react';

import api from '../services/api';
import history from '../history';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  async function handleLogin(values) {
    try {
      const { data: { token } } = await api.post('/authenticate', values);
        
      localStorage.setItem('token', JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push('/');    
    } catch (error) {
      alert( error.response.data.error );
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}