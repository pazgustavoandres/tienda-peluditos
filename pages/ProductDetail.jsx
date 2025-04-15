import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  // Datos de ejemplo para un producto (en una aplicación real, estos datos vendrían de una API)
  const product = {
    id: Number(id),
    name: "Royal Canin Maxi Adult",
    price: 52.99,
    originalPrice: 59.99,
    discount: 12,
    rating: 4.8,
    numReviews: 124,
    stock: 10,
    description: "Royal Canin Maxi Adult es un alimento completo y equilibrado especialmente formulado para perros adultos de razas grandes. Con nutrientes de alta calidad que ayudan a mantener huesos y articulaciones sanas, además de contribuir a una digestión óptima.",
    features: [
      "Formulado para perros de razas grandes (de 26 a 44 kg) de más de 15 meses de edad",
      "Ayuda a mantener huesos y articulaciones sanas gracias a un equilibrio óptimo de minerales",
      "Favorece una digestión saludable con proteínas de alta calidad",
      "Contiene antioxidantes para reforzar el sistema inmunitario"
    ],
    images: [
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    category: "Perros",
    brand: "Royal Canin",
    weight: "15kg"
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  // Incrementar cantidad
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Añadir al carrito
  const addToCart = () => {
    console.log(`Añadido al carrito: ${product.name}, cantidad: ${quantity}`);
    // Aquí iría la lógica para añadir al carrito
    navigate('/cart');
  };

  // Generar estrellas para la calificación
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Estrella completa
        stars.push(
          <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Media estrella
        stars.push(
          <svg key={`star-half-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
          <svg key={`star-empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      }
    }
    
    return stars;
  };

  // Imágenes del producto
  const [selectedImage, setSelectedImage] = useState(0);

  // Calcular el porcentaje de descuento
  const discountPercentage = product.discount || Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-6 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex text-sm">
              <li className="flex items-center">
                <Link to="/" className="text-gray-500 hover:text-gray-700">Inicio</Link>
                <svg className="mx-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="text-gray-500 hover:text-gray-700">Productos</Link>
                <svg className="mx-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li className="flex items-center">
                <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">{product.category}</Link>
                <svg className="mx-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="md:flex">
              {/* Imágenes */}
              <div className="md:w-1/2 p-6">
                <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Badge de descuento */}
                  {product.discount > 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-600 text-white px-2 py-1 text-sm font-medium rounded">
                        -{discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Miniaturas de imágenes */}
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button 
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image}
                        alt={`${product.name} - imagen ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Información del producto */}
              <div className="md:w-1/2 p-6 md:border-l border-gray-200">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  
                  {/* Marca y SKU */}
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span>Marca: <span className="font-medium">{product.brand}</span></span>
                    <span className="mx-2">•</span>
                    <span>Peso: <span className="font-medium">{product.weight}</span></span>
                  </div>
                  
                  {/* Calificación */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-1">
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-900 font-medium">{product.rating}</span> ({product.numReviews} reseñas)
                    </p>
                  </div>
                  
                  {/* Precio */}
                  <div className="mb-6">
                    <div className="flex items-center mb-1">
                      <span className="text-3xl font-bold text-gray-900">{product.price.toFixed(2)}€</span>
                      {product.originalPrice > 0 && (
                        <span className="text-lg text-gray-500 line-through ml-2">{product.originalPrice.toFixed(2)}€</span>
                      )}
                    </div>
                    {product.discount > 0 && (
                      <p className="text-sm text-green-600">Ahorras: {(product.originalPrice - product.price).toFixed(2)}€ ({discountPercentage}%)</p>
                    )}
                  </div>
                  
                  {/* Descripción breve */}
                  <div className="mb-6">
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                  
                  {/* Cantidad y botón añadir al carrito */}
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className="mr-3 font-medium">Cantidad:</span>
                      <div className="custom-number-input flex">
                        <button
                          onClick={decrementQuantity}
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-l flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                          </svg>
                        </button>
                        <input
                          type="number"
                          className="h-10 w-16 border-y border-gray-300 text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                          value={quantity}
                          onChange={handleQuantityChange}
                          min="1"
                          max={product.stock}
                        />
                        <button
                          onClick={incrementQuantity}
                          className="bg-gray-200 text-gray-600 hover:bg-gray-300 h-10 w-10 rounded-r flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12M6 12h12"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <span className="ml-4 text-sm text-gray-600">
                        {product.stock > 0 ? `${product.stock} disponibles` : 'No disponible'}
                      </span>
                    </div>
                    
                    <button
                      onClick={addToCart}
                      disabled={product.stock === 0}
                      className={`w-full py-3 px-6 flex items-center justify-center rounded-lg ${
                        product.stock > 0
                          ? 'bg-blue-700 hover:bg-blue-800 text-white'
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      } transition-colors font-medium`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Añadir al carrito
                    </button>
                  </div>
                  
                  {/* Envío y garantía */}
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Envío gratuito en pedidos superiores a 49€
                    </p>
                    <p className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Entrega en 24/48 horas
                    </p>
                    <p className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Devoluciones gratuitas en 30 días
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Características del producto */}
            <div className="border-t border-gray-200 p-6">
              <h2 className="text-lg font-bold mb-4">Características</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <svg className="w-5 h-5 mt-0.5 mr-2 text-blue-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 