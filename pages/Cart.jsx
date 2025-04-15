import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiPlus, FiMinus, FiX, FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../src/context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2d3b4a]">Tu Carrito</h1>
          <p className="text-[#5a6b7e] mt-2">Revisa y completa tu pedido</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de productos en el carrito */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="hidden md:flex border-b border-gray-200 pb-4 mb-4 text-[#5a6b7e] font-medium">
                  <div className="w-2/5">Producto</div>
                  <div className="w-1/5 text-center">Precio</div>
                  <div className="w-1/5 text-center">Cantidad</div>
                  <div className="w-1/5 text-center">Total</div>
                </div>

                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row items-center py-4 border-b border-gray-200 last:border-b-0">
                    {/* Producto e imagen */}
                    <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                      <div className="w-20 h-20 mr-4 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="text-[#2d3b4a] font-medium">{item.name}</h3>
                        <p className="text-sm text-[#5a6b7e] mt-1">{item.variant}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 mt-2 flex items-center md:hidden"
                        >
                          <FiX size={14} className="mr-1" /> Eliminar
                        </button>
                      </div>
                    </div>

                    {/* Precio unitario */}
                    <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-[#5a6b7e] mb-1">Precio unitario:</div>
                      <span className="text-[#2d3b4a] font-medium">${item.price.toLocaleString()}</span>
                    </div>

                    {/* Selector de cantidad */}
                    <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-[#5a6b7e] mb-1 mr-2">Cantidad:</div>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-[#2d3b4a] disabled:text-gray-300"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-[#2d3b4a]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#2d3b4a]"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Precio total */}
                    <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                      <div className="md:hidden text-sm text-[#5a6b7e] mb-1">Total:</div>
                      <span className="text-[#2d3b4a] font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>

                    {/* Botón eliminar (escritorio) */}
                    <div className="hidden md:block">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiX size={18} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex justify-between items-center">
                  <Link to="/products" className="flex items-center text-[#8B4513] hover:text-[#6d3610] transition-colors">
                    <FiArrowLeft className="mr-2" /> Continuar comprando
                  </Link>
                  <button 
                    onClick={() => {}}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Resumen y checkout */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-[#2d3b4a] mb-4">Resumen de compra</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#5a6b7e]">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#5a6b7e]">
                    <span>Envío</span>
                    <span>${shipping.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-semibold text-[#2d3b4a]">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#8B4513] text-white py-3 rounded-md font-medium hover:bg-[#6d3610] transition-colors"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="max-w-md mx-auto">
              <img src="/images/empty-cart.svg" alt="Carrito vacío" className="w-48 h-48 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-[#2d3b4a] mb-2">Tu carrito está vacío</h2>
              <p className="text-[#5a6b7e] mb-6">Parece que no has añadido ningún producto a tu carrito todavía.</p>
              <Link 
                to="/products" 
                className="inline-block bg-[#8B4513] text-white px-6 py-3 rounded-md font-medium hover:bg-[#6d3610] transition-colors"
              >
                Explorar productos
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 