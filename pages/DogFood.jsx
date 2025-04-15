import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function DogFood() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de productos
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const products = [
    {
      id: 1,
      name: "High Prairie Canine",
      description: "Con bisonte asado y venado asado",
      price: 645.00,
      image: "https://tasteofthewild.mx/wp-content/uploads/2023/03/high-prairie-canine-min.png",
      details: "Proteína cruda (mín.) 32% | Grasa cruda (mín.) 18% | Fibra cruda (máx.) 3.5%",
      sizes: ["2.27kg", "5.6kg", "12.7kg"]
    },
    {
      id: 2,
      name: "Pacific Stream Canine",
      description: "Con salmón ahumado",
      price: 645.00,
      image: "https://tasteofthewild.mx/wp-content/uploads/2023/03/pacific-stream-canine-min.png"
    },
    {
      id: 3,
      name: "Sierra Mountain Canine",
      description: "Con cordero asado",
      price: 645.00,
      image: "https://tasteofthewild.mx/wp-content/uploads/2023/03/sierra-mountain-canine-min.png"
    },
    {
      id: 4,
      name: "Wetlands Canine",
      description: "Con aves de corral asadas",
      price: 645.00,
      image: "https://tasteofthewild.mx/wp-content/uploads/2023/03/wetlands-canine-min.png"
    },
    {
      id: 5,
      name: "High Prairie Puppy",
      description: "Con bisonte y venado asados",
      price: 645.00,
      image: "https://tasteofthewild.mx/wp-content/uploads/2023/03/high-prairie-puppy-min.png"
    }
  ];

  const handleAddToCart = (product) => {
    toast.success(`${product.name} agregado al carrito`);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    toast.success(
      favorites.includes(productId) 
        ? 'Eliminado de favoritos'
        : 'Agregado a favoritos'
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section con Parallax */}
      <motion.div 
        className="relative bg-blue-700 text-white py-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <img
            src="https://tasteofthewild.mx/wp-content/uploads/2023/03/banner-taste.jpg"
            alt="Taste of the Wild Banner"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div 
          className="relative container mx-auto px-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comida para Perro Taste of the Wild</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Nutrición premium inspirada en la dieta ancestral de tu mejor amigo
          </p>
        </motion.div>
      </motion.div>

      {/* Products Grid con animaciones */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product) => (
              <motion.div 
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-square group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <button 
                      onClick={() => toggleFavorite(product.id)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <FiHeart 
                        className={`w-5 h-5 ${
                          favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`}
                      />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                      <FiInfo className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.sizes?.map(size => (
                      <span key={size} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-700">${product.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center"
                    >
                      <FiShoppingCart className="mr-2" />
                      Agregar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal de detalles del producto */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">{selectedProduct.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProduct.details}</p>
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Features Section con animaciones */}
      <motion.div 
        className="bg-gray-100 py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            ¿Por qué Taste of the Wild?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "icon-1.png",
                title: "Proteína Real",
                description: "Ingredientes de primera calidad para una nutrición óptima"
              },
              {
                icon: "icon-2.png",
                title: "Sin Granos",
                description: "Fórmulas libres de granos para una digestión saludable"
              },
              {
                icon: "icon-3.png",
                title: "Nutrientes Naturales",
                description: "Frutas y verduras para una nutrición completa"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div 
                  className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={`https://tasteofthewild.mx/wp-content/uploads/2023/03/${feature.icon}`}
                    alt={feature.title}
                    className="w-12 h-12"
                  />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
} 