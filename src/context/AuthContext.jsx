import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función para registro
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      // Guardar datos en localStorage (sin la contraseña)
      const userToStore = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  // Función para login
  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      // Guardar datos en localStorage
      const userToStore = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token
      };

      localStorage.setItem('user', JSON.stringify(userToStore));
      setCurrentUser(userToStore);
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // Función para logout
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };
  
  // Función para recuperar contraseña
  const forgotPassword = async (email) => {
    try {
      // Esta sería la implementación real que se conectaría al backend
      // En este ejemplo, simulamos la respuesta exitosa
      
      // const response = await fetch(`${API_URL}/forgot-password`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email })
      // });
      
      // const data = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(data.message || 'Error al solicitar recuperación de contraseña');
      // }
      
      // Simulación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { success: true, message: 'Instrucciones enviadas a tu correo electrónico' };
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    forgotPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 