import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

export default function Favorites() {
  const { currentUser } = useAuth();
  
  // Datos de ejemplo de favoritos
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Taste of the Wild Pacific Stream Gato",
      price: 45990,
      originalPrice: 55990,
      discount: 18,
      rating: 4.8,
      numReviews: 89,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "gatos",
      inStock: true
    },
    {
      id: 3,
      name: "Taste of the Wild Ancient Prairie",
      price: 58990,
      originalPrice: 69990,
      discount: 16,
      rating: 4.9,
      numReviews: 65,
      image: "https://cdnx.jumpseller.com/pet-bj/image/12245170/resize/635/635?1658153434",
      category: "perros",
      inStock: true
    },
    {
      id: 5,
      name: "Taste of the Wild Sierra Mountain Canine",
      price: 58990,
      originalPrice: 68990,
      discount: 15,
      rating: 4.7,
      numReviews: 54,
      image: "https://www.tasteofthewildpetfood.com/wp-content/themes/totw-parent/assets/img/products/packages/dry/sierra_mountain.jpg",
      category: "perros",
      inStock: false
    }
  ]);
  
  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId));
  };
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " CLP";
  };
  
  const calculateDiscount = (originalPrice, price) => {
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    return discount;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2d3b4a] mb-6">Mis Favoritos</h1>
        
        {!currentUser ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">Inicia sesión para ver tus favoritos</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu lista de favoritos</p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        ) : favorites.length === 0 ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">No tienes favoritos</h2>
            <p className="text-gray-600 mb-6">Aún no has agregado productos a tu lista de favoritos</p>
            <Link 
              to="/products" 
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-60 object-cover"
                    />
                  </Link>
                  <button 
                    className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    <FaHeart size={20} />
                  </button>
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <Link to={`/product/${product.id}`} className="block">
                      <h2 className="text-lg font-semibold text-[#2d3b4a] mb-2 hover:text-[#8B4513] transition-colors">
                        {product.name}
                      </h2>
                    </Link>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating) ? (
                              <span>★</span>
                            ) : i < product.rating ? (
                              <span>★</span>
                            ) : (
                              <span className="text-gray-300">★</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({product.numReviews})</span>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-[#2d3b4a]">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        {product.inStock ? (
                          <span className="text-green-600">En stock</span>
                        ) : (
                          <span className="text-red-600">Agotado</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      disabled={!product.inStock}
                      className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 
                      ${product.inStock ? 'bg-[#8B4513] text-white hover:bg-[#6d3911]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                      <FaShoppingCart />
                      <span>Añadir al carrito</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 