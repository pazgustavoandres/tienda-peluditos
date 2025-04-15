import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../src/context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import { toast } from 'react-hot-toast';

export default function ProductCard({ product, className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);
  
  // Calcular el porcentaje de descuento si existe
  const discountPercentage = product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  // Función para añadir al carrito
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para añadir productos al carrito');
      navigate('/login');
      return;
    }
    
    setIsAdding(true);
    
    // Añadir al carrito
    addToCart(product);
    
    // Mostrar animación por 800ms
    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };
  
  // Abrir modal de detalle de producto
  const handleCardClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };
  
  // Generar estrellas según la calificación
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Estrella completa
        stars.push(
          <svg key={`star-${i}`} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Media estrella
        stars.push(
          <svg key={`star-half-${i}`} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      } else {
        // Estrella vacía
        stars.push(
          <svg key={`star-empty-${i}`} className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      }
    }
    
    return stars;
  };
  
  return (
    <>
      <div className={`bg-[#f8f3e0] rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-[#e6dfcf] ${className || ''}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 hover:text-[#8B4513]">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-[#8B4513] font-bold">${product.price}</span>
            <button 
              onClick={() => handleAddToCart(product)}
              className="bg-[#8B4513] text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#723a0f] hover:shadow-lg transform active:scale-95"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de detalle del producto */}
      <ProductDetailModal 
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 