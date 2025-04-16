import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';
import { useAuth } from '../src/context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { forgotPassword } = useAuth();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setError('El email es obligatorio');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateEmail()) {
      setIsLoading(true);
      
      try {
        // Usar la función del contexto de autenticación
        await forgotPassword(email);
        
        setIsSubmitted(true);
        toast.success('Instrucciones enviadas a tu correo');
      } catch (error) {
        toast.error(error.message || 'Error al enviar las instrucciones. Inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-[#f8f3e0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2d3b4a]">
              Recuperar contraseña
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-green-800">¡Correo enviado!</h3>
              <p className="mt-1 text-sm text-green-600">
                Hemos enviado instrucciones para recuperar tu contraseña al correo {email}
              </p>
              <div className="mt-6">
                <Link 
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#8B4513] hover:bg-[#723a0f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]"
                >
                  Volver a iniciar sesión
                </Link>
              </div>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                  className={`mt-1 appearance-none block w-full px-3 py-2 border ${
                    error ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B4513] focus:border-[#8B4513] sm:text-sm`}
                  placeholder="tu@email.com"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isLoading ? 'bg-[#a97c50]' : 'bg-[#8B4513] hover:bg-[#723a0f]'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513]`}
                >
                  {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
                </button>
              </div>
              
              <div className="text-center">
                <Link to="/login" className="font-medium text-[#8B4513] hover:text-[#723a0f]">
                  Volver a iniciar sesión
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 