import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ServerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    speciality: '',
    experience: '',
    schedule: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'server') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      speciality: parsedUser.speciality || '',
      experience: parsedUser.experience || '',
      schedule: parsedUser.schedule || ''
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Has cerrado sesión correctamente');
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Actualizar datos en localStorage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    toast.success('Perfil actualizado correctamente');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F3E9] flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Perfil de Servidor</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Especialidad
                </label>
                <input
                  type="text"
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Experiencia
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ej: Lunes a Viernes 9:00 - 18:00"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-gray-600 text-sm">Nombre</h3>
                <p className="text-gray-800">{user.name}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm">Email</h3>
                <p className="text-gray-800">{user.email}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm">Teléfono</h3>
                <p className="text-gray-800">{user.phone || 'No especificado'}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm">Especialidad</h3>
                <p className="text-gray-800">{user.speciality || 'No especificada'}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm">Experiencia</h3>
                <p className="text-gray-800">{user.experience || 'No especificada'}</p>
              </div>

              <div>
                <h3 className="text-gray-600 text-sm">Horario de Atención</h3>
                <p className="text-gray-800">{user.schedule || 'No especificado'}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Editar Perfil
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
} 