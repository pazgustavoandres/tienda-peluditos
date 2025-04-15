import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useCart } from '../src/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { addToCart } = useCart();
  const modalRef = useRef(null);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  
  // Calcular el porcentaje de descuento si existe
  const discountPercentage = product?.discount || Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100);
  
  // Cerrar el modal al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  // Incrementar cantidad
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para añadir productos al carrito');
      onClose();
      navigate('/login');
      return;
    }

    setIsAdding(true);
    
    // Añadir al carrito con la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    // Mostrar animación por 800ms
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 800);
  };
  
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header del modal con botón de cierre */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <div className="md:flex p-6">
          {/* Imágenes */}
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <div className="flex justify-center items-center h-full w-full">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-[90%] h-[90%] object-contain"
                />
              </div>
              
              {/* Badge de categoría */}
              <div className="absolute top-2 left-2">
                <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 text-xs font-medium rounded">
                  {product.category}
                </span>
              </div>
              
              {/* Badge de descuento si hay */}
              {product.discount > 0 && (
                <div className="absolute top-2 right-2">
                  <span className="bg-red-600 text-white px-1.5 py-0.5 text-xs font-medium rounded">
                    -{discountPercentage}%
                  </span>
                </div>
              )}

              {/* Badge de stock */}
              <div className="absolute bottom-2 left-2">
                <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'En stock' : 'Agotado'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Información del producto */}
          <div className="md:w-1/2">
            {/* Calificación */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } w-5 h-5`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.numReviews} reseñas)</span>
            </div>
            
            {/* Precio */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">${(product.price * 890).toLocaleString('es-CL')}</span>
                {product.originalPrice > 0 && (
                  <span className="text-gray-500 text-sm line-through ml-2">
                    ${(product.originalPrice * 890).toLocaleString('es-CL')}
                  </span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  Ahorras: ${((product.originalPrice - product.price) * 890).toLocaleString('es-CL')} ({discountPercentage}%)
                </p>
              )}
            </div>
            
            {/* Cantidad */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <input
                  type="number"
                  className="w-16 border-y border-gray-300 py-2 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0) setQuantity(value);
                  }}
                  min="1"
                />
                <button
                  onClick={incrementQuantity}
                  className="p-2 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Botón Añadir al carrito */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || !isAuthenticated}
              className={`w-full ${
                !isAuthenticated 
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isAdding 
                    ? 'bg-green-600' 
                    : 'bg-blue-700 hover:bg-blue-800'
              } text-white py-3 px-4 rounded-lg transition flex items-center justify-center ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!isAuthenticated ? 'Inicia sesión para añadir al carrito' : ''}
            >
              {isAdding ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Añadido al carrito
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  {isAuthenticated ? 'Añadir al carrito' : 'Inicia sesión para comprar'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 