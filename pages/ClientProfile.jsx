import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLogOut, FiShoppingBag, FiPackage, FiHeart } from 'react-icons/fi';
import Layout from '../components/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ClientProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'client') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    setFormData({
      name: parsedUser.name || '',
      email: parsedUser.email || '',
      phone: parsedUser.phone || '',
      address: parsedUser.address || ''
    });
  }, [navigate]);

  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

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
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Título de la página */}
        <div className="mb-8 text-center" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-[#2d3b4a]">Mi Perfil</h1>
          <p className="text-[#5a6b7e] mt-2">Bienvenido/a a tu perfil personal, {user.name}</p>
        </div>
      
        <div className="max-w-5xl mx-auto">
          {/* Sección superior con información del usuario */}
          <div 
            className="bg-[#f8f3e0]/70 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-[#e6dfcf]/60 mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Encabezado con nombre y opciones */}
            <div 
              className="bg-[#8B4513]/90 backdrop-blur-sm px-6 py-4 rounded-t-3xl"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full">
                    <FiUser className="w-6 h-6 text-[#8B4513]" />
                  </div>
                  <h1 className="text-xl font-bold text-white">Mi Cuenta</h1>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-[#2d3b4a] text-white px-4 py-2 rounded-full hover:bg-[#1f2936] transition-all duration-300"
                >
                  <FiLogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-8">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-bold mb-2 flex items-center">
                      <FiUser className="w-4 h-4 mr-2" />
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-bold mb-2 flex items-center">
                      <FiMail className="w-4 h-4 mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-bold mb-2 flex items-center">
                      <FiPhone className="w-4 h-4 mr-2" />
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-bold mb-2 flex items-center">
                      <FiMapPin className="w-4 h-4 mr-2" />
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 bg-[#2d3b4a] text-white rounded-full hover:bg-[#1f2936] transition-all duration-300 flex items-center"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#8B4513] text-white rounded-full hover:bg-[#723a0f] transition-all duration-300 flex items-center"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border border-[#e6dfcf]/60"
                      data-aos="fade-right"
                      data-aos-delay="300"
                    >
                      <div className="flex items-center text-[#8B4513] text-sm font-medium mb-2">
                        <FiUser className="w-5 h-5 mr-2" />
                        Nombre
                      </div>
                      <p className="text-[#2d3b4a] font-medium text-lg">{user.name}</p>
                    </div>

                    <div 
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border border-[#e6dfcf]/60"
                      data-aos="fade-left"
                      data-aos-delay="400"
                    >
                      <div className="flex items-center text-[#8B4513] text-sm font-medium mb-2">
                        <FiMail className="w-5 h-5 mr-2" />
                        Email
                      </div>
                      <p className="text-[#2d3b4a] font-medium text-lg">{user.email}</p>
                    </div>

                    <div 
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border border-[#e6dfcf]/60"
                      data-aos="fade-right"
                      data-aos-delay="500"
                    >
                      <div className="flex items-center text-[#8B4513] text-sm font-medium mb-2">
                        <FiPhone className="w-5 h-5 mr-2" />
                        Teléfono
                      </div>
                      <p className="text-[#2d3b4a] font-medium text-lg">{user.phone || 'No especificado'}</p>
                    </div>

                    <div 
                      className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md transform transition-all hover:scale-105 border border-[#e6dfcf]/60"
                      data-aos="fade-left"
                      data-aos-delay="600"
                    >
                      <div className="flex items-center text-[#8B4513] text-sm font-medium mb-2">
                        <FiMapPin className="w-5 h-5 mr-2" />
                        Dirección
                      </div>
                      <p className="text-[#2d3b4a] font-medium text-lg">{user.address || 'No especificada'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-6 px-6 py-3 bg-[#8B4513] text-white rounded-full hover:bg-[#723a0f] transition-all duration-300 flex items-center justify-center"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <FiEdit2 className="w-5 h-5 mr-2" />
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sección de Acciones Rápidas */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#2d3b4a] mb-6" data-aos="fade-up">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: <FiShoppingBag className="w-6 h-6" />,
                  title: "Mis Pedidos",
                  description: "Revisa el estado de tus compras recientes",
                  action: () => navigate('/orders'),
                  delay: "300"
                }
              ].map((action, index) => (
                <div
                  key={index}
                  className="bg-[#f8f3e0]/40 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#e6dfcf]/30 cursor-pointer transform hover:scale-105"
                  onClick={action.action}
                  data-aos="fade-up"
                  data-aos-delay={action.delay}
                >
                  <div className="p-6">
                    <div className="bg-[#8B4513]/10 w-14 h-14 rounded-full flex items-center justify-center mb-4 text-[#8B4513]">
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#2d3b4a] mb-2">{action.title}</h3>
                    <p className="text-[#5a6b7e]">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Historial de Pedidos Recientes (Simulado) */}
          <div className="bg-[#f8f3e0]/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-[#e6dfcf]/30 mb-8" data-aos="fade-up">
            <div className="bg-[#2d3b4a]/90 backdrop-blur-sm px-6 py-4 rounded-t-xl">
              <h2 className="text-xl font-bold text-white">Pedidos Recientes</h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white/60 backdrop-blur-sm rounded-xl overflow-hidden">
                  <thead className="bg-[#2d3b4a]/10">
                    <tr>
                      <th className="py-3 px-4 text-left text-[#2d3b4a] font-semibold">Pedido</th>
                      <th className="py-3 px-4 text-left text-[#2d3b4a] font-semibold">Fecha</th>
                      <th className="py-3 px-4 text-left text-[#2d3b4a] font-semibold">Estado</th>
                      <th className="py-3 px-4 text-left text-[#2d3b4a] font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6dfcf]">
                    <tr className="hover:bg-[#f8f3e0]/60 transition-colors">
                      <td className="py-3 px-4 text-[#2d3b4a]">#ORD-12345</td>
                      <td className="py-3 px-4 text-[#5a6b7e]">15 Mar 2023</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Entregado</span>
                      </td>
                      <td className="py-3 px-4 text-[#2d3b4a] font-medium">$120.50</td>
                    </tr>
                    <tr className="hover:bg-[#f8f3e0]/60 transition-colors">
                      <td className="py-3 px-4 text-[#2d3b4a]">#ORD-12346</td>
                      <td className="py-3 px-4 text-[#5a6b7e]">28 Feb 2023</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">En camino</span>
                      </td>
                      <td className="py-3 px-4 text-[#2d3b4a] font-medium">$85.99</td>
                    </tr>
                    <tr className="hover:bg-[#f8f3e0]/60 transition-colors">
                      <td className="py-3 px-4 text-[#2d3b4a]">#ORD-12347</td>
                      <td className="py-3 px-4 text-[#5a6b7e]">15 Ene 2023</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Entregado</span>
                      </td>
                      <td className="py-3 px-4 text-[#2d3b4a] font-medium">$210.75</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 