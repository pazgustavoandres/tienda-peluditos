import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiStar, FiSearch } from 'react-icons/fi';

export default function Products() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 178000]);  // 200€ son aproximadamente 178.000 CLP
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Lista de productos (simulados)
  const allProducts = [
    {
      id: 1,
      name: "Taste of the Wild Pacific Stream Adult",
      price: 52.99,
      originalPrice: 59.99,
      discount: 12,
      rating: 4.8,
      numReviews: 124,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 2,
      name: "Taste of the Wild Pacific Stream Felino",
      price: 19.99,
      originalPrice: 24.99,
      discount: 20,
      rating: 4.5,
      numReviews: 89,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "Gatos",
      inStock: true
    },
    {
      id: 3,
      name: "Taste of the Wild High Prairie Adult",
      price: 29.99,
      originalPrice: 34.99,
      discount: 14,
      rating: 4.6,
      numReviews: 78,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 4,
      name: "Taste of the Wild High Prairie Canine",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.9,
      numReviews: 112,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 5,
      name: "Taste of the Wild Pacific Stream Puppy",
      price: 45.99,
      originalPrice: 49.99,
      discount: 8,
      rating: 4.7,
      numReviews: 103,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2020/10/Taste-Of-The-Wild-Pacific-Stream-Puppy-Salmon-.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 6,
      name: "Taste of the Wild Pacific Stream Gato",
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      rating: 4.6,
      numReviews: 72,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2020/10/Taste-Of-The-Wild-Pacific-Stream-Puppy-Salmon-.jpg",
      category: "Gatos",
      inStock: true
    },
    {
      id: 7,
      name: "Taste of the Wild Pacific Stream Senior",
      price: 69.99,
      originalPrice: 89.99,
      discount: 22,
      rating: 4.4,
      numReviews: 65,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 8,
      name: "Taste of the Wild Pacific Stream Grain Free",
      price: 32.99,
      originalPrice: 39.99,
      discount: 18,
      rating: 4.3,
      numReviews: 48,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 9,
      name: "Taste of the Wild High Prairie Grain Free",
      price: 28.99,
      originalPrice: 34.99,
      discount: 17,
      rating: 4.7,
      numReviews: 83,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 10,
      name: "Taste of the Wild High Prairie Felino",
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      rating: 4.5,
      numReviews: 57,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Gatos",
      inStock: true
    },
    {
      id: 11,
      name: "Taste of the Wild Pacific Stream Kitten",
      price: 9.99,
      originalPrice: 12.99,
      discount: 23,
      rating: 4.4,
      numReviews: 61,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2020/10/Taste-Of-The-Wild-Pacific-Stream-Puppy-Salmon-.jpg",
      category: "Gatos",
      inStock: true
    },
    {
      id: 12,
      name: "Taste of the Wild Pacific Stream Húmedo",
      price: 1.99,
      originalPrice: 2.49,
      discount: 20,
      rating: 4.8,
      numReviews: 94,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2020/10/Taste-Of-The-Wild-Pacific-Stream-Puppy-Salmon-.jpg",
      category: "Gatos",
      inStock: true
    }
  ];

  // Manejar cambios en las categorías seleccionadas
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filtrar productos según selecciones y búsqueda
  const filteredProducts = allProducts.filter(product => {
    // Filtrar por búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(query);
      const matchCategory = product.category.toLowerCase().includes(query);
      if (!matchName && !matchCategory) {
        return false;
      }
    }
    
    // Filtrar por precio
    const productPriceCLP = product.price * 890;
    if (productPriceCLP < priceRange[0] || productPriceCLP > priceRange[1]) {
      return false;
    }
    
    // Filtrar por categoría si hay alguna seleccionada
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    
    return true;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.numReviews - a.numReviews;
    }
  });

  // Obtener categorías únicas para el filtro
  const categories = [...new Set(allProducts.map(product => product.category))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Encabezado de la página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2d3b4a]">Todos los Productos</h1>
          <p className="text-[#5a6b7e] mt-2">Explora nuestra selección de productos de alta calidad para tus mascotas</p>
        </div>
        
        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Área de filtros y productos */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros para escritorio */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#2d3b4a] mb-4">Filtros</h2>
              
              {/* Filtro de categorías */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categorías</h3>
                {categories.map(category => (
                  <div key={category} className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
              
              {/* Filtro de precio */}
              <div>
                <h3 className="font-medium mb-3">Precio</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>${priceRange[0].toLocaleString('es-CL')}</span>
                  <span>${priceRange[1].toLocaleString('es-CL')}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="178000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Botón para mostrar filtros en móvil */}
          <button 
            className="lg:hidden w-full py-3 mb-4 bg-white rounded-lg shadow-sm border border-gray-200 font-medium flex items-center justify-center"
            onClick={() => setShowMobileFilters(true)}
          >
            <FiFilter className="mr-2" /> Mostrar filtros
          </button>
          
          {/* Productos */}
          <div className="flex-1">
            {/* Ordenamiento y estadísticas */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <p className="text-[#5a6b7e] mb-2 sm:mb-0">Mostrando {filteredProducts.length} productos</p>
              
              <div className="relative">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 rounded border border-gray-300 bg-white focus:ring-2 focus:ring-[#8B4513] focus:border-transparent text-[#2d3b4a]"
                >
                  <option value="popularity">Popularidad</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Calificación</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FiChevronDown className="text-gray-500" />
                </div>
              </div>
            </div>
            
            {/* Grid de productos - 3x3 grid exacto */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {sortedProducts.slice(0, 9).map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-full flex-none"
                  data-aos="fade-up" 
                  data-aos-delay={index < 3 ? index * 100 : 0}
                >
                  <div className="cursor-pointer block h-full transform transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col h-full bg-[#f8f3e0] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-[#e6dfcf]/60 overflow-hidden group">
                      <div 
                        className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          width="200"
                          height="200"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {product.discount > 0 && (
                          <div className="absolute top-2 right-2 bg-[#8B4513] text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <h3 
                        className="text-xl font-bold mb-2 line-clamp-2 text-[#2d3b4a] group-hover:text-[#8B4513] transition-colors duration-300"
                      >
                        {product.name}
                      </h3>
                      <div 
                        className="text-sm text-[#5a6b7e] mb-2"
                      >
                        {product.category}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FiStar 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#5a6b7e]">({product.numReviews})</span>
                      </div>
                      <div 
                        className="flex items-center justify-center mb-4"
                      >
                        <span className="text-xl font-bold text-[#8B4513]">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="mt-auto">
                        <button
                          className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#8B4513] text-white rounded-md group-hover:bg-[#723a0f] transition-colors duration-300 text-sm font-semibold"
                        >
                          Añadir al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mensajes de estado */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B4513]"></div>
                <p className="mt-2 text-[#5a6b7e]">Cargando productos...</p>
              </div>
            )}
            
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#5a6b7e]">No se encontraron productos. Intenta cambiar los filtros.</p>
              </div>
            )}
            
            {/* Paginación simple */}
            {filteredProducts.length > 0 && !isLoading && (
              <div className="flex justify-center mt-10">
                <button 
                  onClick={() => setPage(page - 1)} 
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-l border border-gray-300 ${page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-[#2d3b4a] hover:bg-gray-50'}`}
                >
                  Anterior
                </button>
                <div className="px-4 py-2 bg-[#8B4513] text-white border border-[#8B4513]">
                  {page}
                </div>
                <button 
                  onClick={() => setPage(page + 1)} 
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-r border border-gray-300 ${page === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-[#2d3b4a] hover:bg-gray-50'}`}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal de filtros para móvil */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="bg-white w-full max-w-md mx-auto relative z-10 h-full max-h-screen overflow-y-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#2d3b4a]">Filtros</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <FiX size={24} />
                </button>
              </div>
              
              {/* Duplicación de los filtros */}
              <div className="mb-4">
                <h3 className="font-medium mb-2">Categorías</h3>
                {categories.map(category => (
                  <div key={category} className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      id={`mobile-category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="mr-2"
                    />
                    <label htmlFor={`mobile-category-${category}`}>{category}</label>
                  </div>
                ))}
              </div>
              
              {/* Filtro de precio */}
              <div>
                <h3 className="font-medium mb-2">Precio</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>${priceRange[0].toLocaleString('es-CL')}</span>
                  <span>${priceRange[1].toLocaleString('es-CL')}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="178000" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
              
              <div className="mt-6 flex gap-4">
                <button 
                  className="flex-1 py-3 bg-gray-200 rounded-lg text-[#2d3b4a] font-medium"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 178000]);
                  }}
                >
                  Limpiar
                </button>
                <button 
                  className="flex-1 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 