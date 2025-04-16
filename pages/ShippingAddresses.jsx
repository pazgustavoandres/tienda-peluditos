import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { FaHome, FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

export default function ShippingAddresses() {
  const { currentUser } = useAuth();
  
  // Datos de ejemplo de direcciones
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Casa",
      recipient: "Juan Pérez",
      street: "Av. Providencia 1234",
      apartment: "Depto 301",
      city: "Santiago",
      region: "Región Metropolitana",
      postalCode: "7500000",
      phone: "+56 9 1234 5678",
      isDefault: true
    },
    {
      id: 2,
      name: "Oficina",
      recipient: "Juan Pérez",
      street: "Av. Las Condes 9876",
      apartment: "Piso 4, Oficina 405",
      city: "Santiago",
      region: "Región Metropolitana",
      postalCode: "7550000",
      phone: "+56 9 8765 4321",
      isDefault: false
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    recipient: "",
    street: "",
    apartment: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    isDefault: false
  });
  
  const resetForm = () => {
    setFormData({
      name: "",
      recipient: "",
      street: "",
      apartment: "",
      city: "",
      region: "",
      postalCode: "",
      phone: "",
      isDefault: false
    });
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleDelete = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };
  
  const handleEdit = (address) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setShowAddForm(true);
  };
  
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id
    })));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAddressId) {
      // Actualizar dirección existente
      setAddresses(addresses.map(address => 
        address.id === editingAddressId 
          ? { ...formData, id: editingAddressId } 
          : formData.isDefault 
            ? { ...address, isDefault: false } 
            : address
      ));
      setEditingAddressId(null);
    } else {
      // Agregar nueva dirección
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      
      if (newAddress.isDefault) {
        setAddresses([
          ...addresses.map(address => ({ ...address, isDefault: false })),
          newAddress
        ]);
      } else {
        setAddresses([...addresses, newAddress]);
      }
    }
    
    resetForm();
    setShowAddForm(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#2d3b4a]">Mis Direcciones</h1>
          {!showAddForm && currentUser && (
            <button 
              className="px-4 py-2 bg-[#8B4513] text-white rounded-lg font-medium flex items-center gap-2"
              onClick={() => {
                resetForm();
                setEditingAddressId(null);
                setShowAddForm(true);
              }}
            >
              <FaPlus />
              <span>Agregar dirección</span>
            </button>
          )}
        </div>
        
        {!currentUser ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">Inicia sesión para gestionar tus direcciones</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tus direcciones guardadas</p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        ) : showAddForm ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-[#2d3b4a] mb-4">
              {editingAddressId ? "Editar dirección" : "Agregar nueva dirección"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    Nombre de la dirección
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Ej: Casa, Trabajo, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="recipient">
                    Nombre del destinatario
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Nombre y apellido"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="street">
                    Calle y número
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Av. Ejemplo 1234"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="apartment">
                    Departamento, oficina, etc. (opcional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Depto 101, Oficina 305, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="city">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Ciudad"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="region">
                    Región
                  </label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Región"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="postalCode">
                    Código postal
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="Código postal"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    Teléfono de contacto
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
                    placeholder="+56 9 1234 5678"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="mr-2 h-5 w-5 text-[#8B4513] focus:ring-[#8B4513]"
                  />
                  <span className="text-gray-700">Establecer como dirección predeterminada</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium"
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8B4513] text-white rounded-lg font-medium"
                >
                  {editingAddressId ? "Guardar cambios" : "Agregar dirección"}
                </button>
              </div>
            </form>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">No tienes direcciones guardadas</h2>
            <p className="text-gray-600 mb-6">Agrega tu primera dirección para agilizar el proceso de compra</p>
            <button 
              onClick={() => {
                resetForm();
                setEditingAddressId(null);
                setShowAddForm(true);
              }}
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Agregar dirección
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map(address => (
              <div key={address.id} className="bg-white rounded-lg shadow-md p-6 relative">
                {address.isDefault && (
                  <div className="absolute top-3 right-3 bg-[#8B4513] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <FaCheck size={10} />
                    <span>Predeterminada</span>
                  </div>
                )}
                
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#f8f3e0] flex items-center justify-center text-[#8B4513] mr-3">
                    <FaHome size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2d3b4a]">{address.name}</h3>
                    <p className="text-gray-600">{address.recipient}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700">{address.street}</p>
                  {address.apartment && <p className="text-gray-700">{address.apartment}</p>}
                  <p className="text-gray-700">{address.city}, {address.region}</p>
                  <p className="text-gray-700">CP: {address.postalCode}</p>
                  <p className="text-gray-700 mt-2">{address.phone}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleEdit(address)}
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    <FaEdit size={14} />
                    <span>Editar</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(address.id)}
                    className="px-3 py-1 border border-red-300 text-red-600 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    <FaTrash size={14} />
                    <span>Eliminar</span>
                  </button>
                  {!address.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(address.id)}
                      className="px-3 py-1 border border-[#8B4513] text-[#8B4513] rounded-lg text-sm font-medium flex items-center gap-1"
                    >
                      <FaCheck size={14} />
                      <span>Establecer como predeterminada</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 