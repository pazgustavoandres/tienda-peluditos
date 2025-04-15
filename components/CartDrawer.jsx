import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../src/context/CartContext';
import { toast } from 'react-hot-toast';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const drawerRef = useRef(null);
  
  // Cerrar el drawer al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user && isOpen) {
      toast.error('Debes iniciar sesión para acceder al carrito');
      onClose();
      navigate('/login');
    }
    setIsAuthenticated(!!user);
  }, [isOpen, navigate, onClose]);

  if (!isAuthenticated) return null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      {/* Overlay de fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Panel del carrito */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Encabezado */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <FiShoppingCart className="w-5 h-5 mr-2" />
                Carrito ({cartItems.length})
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            {/* Contenido del carrito */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-block p-4 rounded-full bg-gray-100 mb-3">
                    <FiShoppingCart className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="mt-1 text-gray-500">Tu carrito está vacío</p>
                  <button 
                    onClick={onClose}
                    className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Detalles del producto */}
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * 890).toLocaleString('es-CL')}
                          </p>
                        </div>
                        
                        <div className="mt-1 flex items-center justify-between">
                          {/* Selector de cantidad */}
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Botón eliminar */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Eliminar"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Resumen del carrito */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                <div className="flex justify-between text-sm mb-2">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="font-medium text-gray-900">${(subtotal * 890).toLocaleString('es-CL')}</p>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <p className="text-gray-700">Envío</p>
                  <p className="font-medium text-gray-900">
                    {shipping === 0 ? 'Gratis' : `$${(shipping * 890).toLocaleString('es-CL')}`}
                  </p>
                </div>
                <div className="flex justify-between text-base font-medium mt-4 pt-2 border-t border-gray-200">
                  <p className="text-gray-900">Total</p>
                  <p className="text-gray-900">${(total * 890).toLocaleString('es-CL')}</p>
                </div>
                
                <div className="mt-4">
                  <Link
                    to="/checkout"
                    className="w-full bg-blue-700 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={onClose}
                  >
                    Finalizar compra
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 