import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiChevronRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useCart } from '../src/context/CartContext';
import { toast } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Cats() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      disable: window.innerWidth < 768
    });
  }, []);

  // Lista de productos para gatos (completando a 9 para una cuadrícula 3x3)
  const products = [
    {
      id: 2,
      name: "Taste of the Wild Canyon River Feline",
      price: 56.99,
      originalPrice: 67.99,
      discount: 16,
      rating: 4.7,
      numReviews: 77,
      image: "https://bestforpets.cl/tienda/12795-large_default/taste-of-the-wild-canyon-river-feline.jpg",
      category: "Gatos",
      inStock: true
    },
    {
      id: 3,
      name: "Taste of the Wild Lowland Creek Feline",
      price: 54.99,
      originalPrice: 64.99,
      discount: 15,
      rating: 4.6,
      numReviews: 78,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2020/10/taste-of-the-wild-lowland-creek.jpg.webp",
      category: "Gatos",
      inStock: true
    },
    {
      id: 4,
      name: "Taste of the Wild Rocky Mountain Kitten",
      price: 61.99,
      originalPrice: 72.99,
      discount: 15,
      rating: 4.8,
      numReviews: 51,
      image: "https://cdnx.jumpseller.com/avock1/image/34863975/resize/1200/1200?1683336045",
      category: "Gatos",
      inStock: true
    },
    {
      id: 6,
      name: "Taste of the Wild Prey Turkey Feline",
      price: 64.99,
      originalPrice: 74.99,
      discount: 13,
      rating: 4.5,
      numReviews: 38,
      image: "https://http2.mlstatic.com/D_Q_NP_703928-MLU70612002450_072023-O.webp",
      category: "Gatos",
      inStock: true
    },
    {
      id: 9,
      name: "Taste of the Wild Wetlands Feline",
      price: 59.99,
      originalPrice: 69.99,
      discount: 14,
      rating: 4.7,
      numReviews: 41,
      image: "https://bestforpets.cl/tienda/12794-large_default/taste-of-the-wild-wetlands-wild-fowl.jpg",
      category: "Gatos",
      inStock: true
    }
  ];

  // Función para manejar la adición de productos al carrito
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('Debes iniciar sesión para añadir productos al carrito');
      navigate('/login');
      return;
    }
    
    addToCart(product);
    toast.success('Producto añadido al carrito');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] pt-16 overflow-hidden flex items-center">
        {/* Imagen de fondo del hero */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.tasteofthewildpetfood.com/wp-content/uploads/2024/11/taste-of-the-wild-high-prairie-in-front-of-ancient-stream-and-prey-angus-beef-recipes-100824.png" 
            alt="Productos para Gatos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
              Todo lo que tu gato necesita
            </h1>
            <p className="text-xl text-white mb-6 max-w-2xl drop-shadow-md">
              Descubre nuestra selección de productos especialmente diseñados para satisfacer las necesidades específicas de tu felino.
            </p>
          </div>
        </div>
      </section>
      
      {/* Migas de pan */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-[#8B4513]">Inicio</Link> <FiChevronRight className="inline mx-1" /> <span className="font-medium text-[#2d3b4a]">Gatos</span>
        </div>
      </div>
      
      {/* Contenido principal */}
      <section className="py-12 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Descripción adicional */}
          <div className="bg-[#f8f3e0] p-6 rounded-xl shadow-sm mb-12" data-aos="fade-up">
            <p className="text-[#5a6b7e]">
              Desde alimentos de alta calidad hasta juguetes interactivos y accesorios para el cuidado, tenemos todo lo que tu gato podría desear. Nos asociamos con las mejores marcas especializadas en salud y bienestar felino para garantizar que tu compañero de cuatro patas reciba solo lo mejor.
            </p>
          </div>
          
          {/* Productos - Grid exacto de 3x3 */}
          <h2 className="text-3xl font-bold mb-8 text-[#2d3b4a]" data-aos="fade-up">Productos destacados para gatos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4" data-aos="fade-up">
            {products.slice(0, 9).map((product, index) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="bg-[#f8f3e0] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 border border-[#e6dfcf]/60 overflow-hidden group h-full flex flex-col">
                  <div className="relative aspect-square mb-2 overflow-hidden rounded-md">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.discount > 0 && (
                      <span className="absolute top-1 right-1 bg-[#8B4513] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold mb-1 line-clamp-2 text-[#2d3b4a] group-hover:text-[#8B4513] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="text-xs text-[#5a6b7e] mb-1">
                    {product.category}
                  </div>
                  <div className="flex items-center mb-1 text-xs">
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500">{product.rating}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="text-sm font-bold text-[#8B4513]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-1">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="inline-flex items-center justify-center w-full px-2 py-1.5 bg-[#8B4513] text-white rounded-md hover:bg-[#723a0f] transition-colors duration-300 text-xs font-semibold"
                      type="button"
                    >
                      Añadir <FiShoppingCart className="ml-1 w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
} 