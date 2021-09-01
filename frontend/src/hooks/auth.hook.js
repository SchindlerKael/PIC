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
      const { data: { token, user } } = await api.post('/authenticate', values);
      user.roles.push({title: "teste"});
      localStorage.setItem('user', JSON.stringify(user));

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
    localStorage.removeItem('user');
    api.defaults.headers.Authorization = undefined;
    history.push('/login');
  }
  
  return { authenticated, loading, handleLogin, handleLogout };
}

export function useLocalUser(){
  const [user, setUser] = useState({name:'', roles: []});

  useEffect(() => {
    const local_user = JSON.parse(localStorage.getItem('user'));

    if (local_user) 
        setUser(local_user);
  }, []);

  return user;
}