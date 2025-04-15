// pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    // Obtener datos del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);
    setFormData({
      nombre: user.nombre || '',
      email: user.email || '',
      telefono: user.telefono || '',
      direccion: user.direccion || ''
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar datos en localStorage
    const updatedUser = { ...userData, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setIsEditing(false);
  };

  if (!userData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Encabezado del perfil */}
            <div className="bg-primary-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-white hover:text-primary-200 transition-colors"
                >
                  {isEditing ? (
                    <FiX className="w-6 h-6" />
                  ) : (
                    <FiEdit2 className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Contenido del perfil */}
            <div className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.nombre}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.telefono || '-'}</p>
                    )}
                  </div>

                  {/* Dirección */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    {isEditing ? (
                      <textarea
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    ) : (
                      <p className="text-gray-900">{userData.direccion || '-'}</p>
                    )}
                  </div>

                  {/* Botones de acción */}
                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors flex items-center"
                      >
                        <FiSave className="w-4 h-4 mr-2" />
                        Guardar cambios
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}