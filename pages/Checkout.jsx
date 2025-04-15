// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiArrowLeft, FiCreditCard, FiMapPin, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { useCart } from '../src/context/CartContext';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { cartItems, subtotal, shipping, total, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: ''
  });

  useEffect(() => {
    // Cargar datos del usuario si está autenticado
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setFormData(prev => ({
        ...prev,
        firstName: userData.name?.split(' ')[0] || '',
        lastName: userData.name?.split(' ')[1] || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || ''
      }));
    }
  }, []);

  // Si no hay productos, redirigir al carrito
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulación de proceso de pago
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpiar carrito (podrías implementar esto en el contexto)
      cartItems.forEach(item => removeFromCart(item.id));
      
      // Mostrar notificación de éxito
      toast.success('¡Tu pedido ha sido procesado con éxito!');
      
      // Redirigir a página de confirmación
      navigate('/order-success');
    } catch (error) {
      toast.error('Hubo un problema al procesar tu pedido. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2d3b4a]">Finalizar Compra</h1>
          <p className="text-[#5a6b7e] mt-2">Completa tus datos para finalizar el pedido</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulario de checkout */}
          <div className="lg:w-2/3">
            <div className="bg-[#f8f3e0]/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#e6dfcf]/60 mb-8">
              <div className="bg-[#8B4513]/90 backdrop-blur-sm px-6 py-4">
                <h2 className="text-xl font-bold text-white">Información de Envío</h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Nombre</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Apellido</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Provincia/Estado</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Código Postal</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-[#f8f3e0]/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#e6dfcf]/60">
              <div className="bg-[#8B4513]/90 backdrop-blur-sm px-6 py-4">
                <h2 className="text-xl font-bold text-white">Método de Pago</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={() => setPaymentMethod('credit')}
                      className="w-4 h-4 text-[#8B4513] focus:ring-[#8B4513]"
                    />
                    <label htmlFor="credit" className="flex items-center">
                      <FiCreditCard className="mr-2 text-[#2d3b4a]" />
                      <span>Tarjeta de Crédito / Débito</span>
                    </label>
                  </div>

                  {paymentMethod === 'credit' && (
                    <div className="pl-7 space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Número de Tarjeta</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Nombre en la Tarjeta</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[#2d3b4a] text-sm font-medium mb-2">Fecha de Expiración</label>
                          <input
                            type="text"
                            name="expDate"
                            value={formData.expDate}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[#2d3b4a] text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                            className="w-full px-4 py-3 border border-[#e6dfcf] rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent bg-white/70 backdrop-blur-sm"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="lg:w-1/3">
            <div className="bg-[#f8f3e0]/70 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-[#e6dfcf]/60 sticky top-24">
              <div className="bg-[#2d3b4a]/90 backdrop-blur-sm px-6 py-4">
                <h2 className="text-xl font-bold text-white">Resumen de Compra</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#2d3b4a] font-medium">{item.name}</h3>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#5a6b7e]">Cantidad: {item.quantity || 1}</span>
                          <span className="text-[#8B4513] font-medium">${((item.price) * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-[#e6dfcf] pt-4 mb-6">
                  <div className="flex justify-between text-[#5a6b7e]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#5a6b7e]">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-[#e6dfcf] pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-[#2d3b4a]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
        </div>
      </div>

                <button 
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-[#8B4513] text-white py-3 rounded-full font-medium hover:bg-[#6d3610] transition-colors disabled:bg-[#8B4513]/50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="mr-2" /> Finalizar Compra
                    </>
                  )}
        </button>

                <Link to="/cart" className="flex items-center justify-center mt-4 text-[#8B4513] hover:text-[#6d3610] transition-colors">
                  <FiArrowLeft className="mr-2" /> Volver al carrito
        </Link>
      </div>
    </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
