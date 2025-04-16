import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Layout from '../components/Layout';
import { useCart } from '../src/context/CartContext';
import { toast } from 'react-hot-toast';

// Importar ProductCard con carga diferida
const ProductCard = lazy(() => import('../components/ProductCard'));

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const productCarouselRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Inicializar AOS una sola vez cuando el componente se monta
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      disable: window.innerWidth < 768 // Desactivar en dispositivos móviles
    });

    // Limpiar AOS cuando el componente se desmonta
    return () => {
      AOS.refresh();
    };
  }, []);

  // Manejar el overflow del body cuando se abre/cierra el modal
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Limpiar al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProduct]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } catch (error) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollProducts = (direction) => {
    if (!productCarouselRef.current) return;
    
    const scrollAmount = direction === 'left' ? -300 : 300;
    productCarouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  // Productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: "Taste of the Wild High Prairie Canine",
      price: 62.99,
      originalPrice: 72.99,
      discount: 14,
      rating: 4.9,
      numReviews: 124,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 2,
      name: "Taste of the Wild Pacific Stream Canine",
      price: 59.99,
      originalPrice: 69.99,
      discount: 14,
      rating: 4.8,
      numReviews: 105,
      image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 3,
      name: "Taste of the Wild Rocky Mountain Feline",
      price: 58.99,
      originalPrice: 69.99,
      discount: 16,
      rating: 4.8,
      numReviews: 89,
      image: "https://tasteofthewild.mx/wp-content/uploads/rocky-mountain-feline-dry-recipe-bag-front-061022659-300x300.png",
      category: "Gatos",
      inStock: true
    },
    {
      id: 4,
      name: "Taste of the Wild Canyon River Feline",
      price: 56.99,
      originalPrice: 67.99,
      discount: 16,
      rating: 4.7,
      numReviews: 77,
      image: "https://tasteofthewild.mx/wp-content/uploads/TOW-CanyonRiver-FRONT-1-300x300.png",
      category: "Gatos",
      inStock: true
    },
    {
      id: 5,
      name: "Taste of the Wild Sierra Mountain Canine",
      price: 61.99,
      originalPrice: 71.99,
      discount: 14,
      rating: 4.7,
      numReviews: 98,
      image: "https://bestforpets.cl/tienda/14599-large_default/taste-of-the-wild-sierra-mountain.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 6,
      name: "Taste of the Wild Lowland Creek Feline",
      price: 59.99,
      originalPrice: 71.99,
      discount: 17,
      rating: 4.9,
      numReviews: 63,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT00eYS4Prn6JTqtYu6sWSBle6MneD4NyCsA&s",
      category: "Gatos",
      inStock: true
    },
    {
      id: 7,
      name: "Taste of the Wild High Prairie Puppy",
      price: 62.99,
      originalPrice: 72.99,
      discount: 14,
      rating: 4.8,
      numReviews: 71,
      image: "https://www.tusmascotas.cl/wp-content/uploads/2022/06/img-taste-high-prairie-puppy.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 8,
      name: "Taste of the Wild Wetlands Canine",
      price: 63.99,
      originalPrice: 73.99,
      discount: 14,
      rating: 4.7,
      numReviews: 92,
      image: "https://bestforpets.cl/tienda/12794-large_default/taste-of-the-wild-wetlands-wild-fowl.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 9,
      name: "Taste of the Wild Southwest Canyon Canine",
      price: 64.99,
      originalPrice: 74.99,
      discount: 13,
      rating: 4.7,
      numReviews: 87,
      image: "https://bestforpets.cl/tienda/14601-large_default/taste-of-the-wild-southwest-canyon.jpg",
      category: "Perros",
      inStock: true
    },
    {
      id: 10,
      name: "Taste of the Wild Appalachian Valley Small Breed Canine",
      price: 65.99,
      originalPrice: 75.99,
      discount: 13,
      rating: 4.8,
      numReviews: 82,
      image: "https://braloy102.akamaized.net/8000/taste-of-the-wild-high-prairie-adulto-122-kg.jpg",
      category: "Perros",
      inStock: true
    }
  ];

  // Modal de producto
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // Función para manejar la adición de productos al carrito
  const handleAddToCart = (e, product) => {
    if (!product) return;
    
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

  // Mapeo optimizado de categorías para evitar re-cálculos
  const categories = [
    {
      title: "Comida para perros",
      image: "https://blog.dogfydiet.com/wp-content/uploads/2024/01/Teckel-cuadro-antiguo.jpg",
      description: "Alimentos formulados específicamente para las necesidades nutricionales de tu perro",
      delay: "0",
      link: "/dogs"
    },
    {
      title: "Comida para gatos",
      image: "https://cdn0.expertoanimal.com/es/posts/9/4/4/evolucion_del_gato_24449_0_600.jpg",
      description: "Nutrición equilibrada y deliciosa para todos los felinos",
      delay: "50",
      link: "/cats"
    },
    {
      title: "Accesorios",
      image: "https://i.etsystatic.com/6099287/r/il/848558/714275639/il_570xN.714275639_a47u.jpg",
      description: "Todo tipo de accesorios para el confort y entretenimiento de tus mascotas",
      delay: "100",
      link: "/products"
    }
  ];

  // Beneficios optimizados
  const benefits = [
    {
      icon: "🚚",
      title: "Envío Gratis",
      description: "En pedidos mayores a $50"
    },
    {
      icon: "🔒",
      title: "Pago Seguro",
      description: "Transacciones 100% seguras"
    },
    {
      icon: "💝",
      title: "Programa de Lealtad",
      description: "Gana puntos en cada compra"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] pt-10 overflow-hidden flex items-center">
        {/* Imagen de fondo del hero */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.tasteofthewildpetfood.com/wp-content/uploads/2024/11/taste-of-the-wild-high-prairie-in-front-of-ancient-stream-and-prey-angus-beef-recipes-100824.png" 
            alt="Taste of the Wild" 
            className="w-full h-full object-cover scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
          </div>
        </div>
      </section>
      
      {/* Sección de mensaje principal */}
      <section className="py-16 relative overflow-hidden my-6">
        {/* Fondo de imagen con overlay */}
        <div className="absolute inset-0 z-0 rounded-xl overflow-hidden">
          <img 
            src="https://i.ebayimg.com/images/g/GwAAAOSw1eFhTiQk/s-l1600.jpg" 
            alt="Fondo Mascotas" 
            className="w-full h-full object-cover object-right-center scale-130"
            loading="lazy"
            style={{ filter: 'brightness(0.85) contrast(1.15)' }}
          />
          <div className="absolute inset-0 bg-black/30 backdrop-filter backdrop-brightness-90"></div>
        </div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-black/30 backdrop-blur-md rounded-xl p-8 shadow-lg" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Tu mascota tiene un deseo instintivo por la proteína de calidad
            </h2>
            <p className="text-xl text-white mb-6 drop-shadow-lg">
              Es por eso que nuestros alimentos están inspirados en la naturaleza y elaborados con proteínas únicas que perros y gatos anhelan. Permite que los instintos naturales de tu mascota se expresen mientras disfrutan de alimentos formulados especialmente con fuentes de proteínas basadas en su dieta ancestral.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link 
                to="/dogs" 
                className="px-8 py-3 bg-[#8B4513] text-white rounded-full font-semibold hover:bg-[#723a0f] transition-all duration-300 inline-flex items-center justify-center"
              >
                Explorar productos para perros
              </Link>
              <Link 
                to="/cats" 
                className="px-8 py-3 bg-[#8B4513] text-white rounded-full font-semibold hover:bg-[#723a0f] transition-all duration-300 inline-flex items-center justify-center"
              >
                Explorar productos para gatos
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Productos Destacados */}
      <section className="py-12 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#2d3b4a]" data-aos="fade-up">
            A la caza del mejor sabor
          </h2>
          <p className="text-center text-[#5a6b7e] text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
            Encontrar los sabores que atraen a tu mascota puede ser un viaje emocionante. Cada una de nuestras recetas ofrece beneficios únicos y experiencias de sabor incomparables.
          </p>
          <Suspense fallback={<div className="w-full text-center py-8">Cargando productos...</div>}>
            <div className="relative px-4 md:px-8">
              <button 
                onClick={() => scrollProducts('left')} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center focus:outline-none border border-gray-200"
                aria-label="Productos anteriores"
                type="button"
              >
                <FiChevronLeft size={20} className="text-[#2d3b4a]" />
              </button>
              
              <div 
                ref={productCarouselRef}
                className="flex overflow-x-auto gap-5 pb-6 pt-2 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {featuredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-72 snap-start scroll-ml-4"
                    data-aos="fade-up"
                    data-aos-delay={index < 4 ? index * 50 : 0}
                  >
                    <div 
                      className="cursor-pointer block h-full transform transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col h-full bg-[#f8f3e0] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 border border-[#e6dfcf]/60 overflow-hidden group">
                        <div 
                          className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg"
                          onClick={() => openProductModal(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-115"
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
                          className="text-lg font-bold mb-1 line-clamp-2 text-[#2d3b4a] group-hover:text-[#8B4513] transition-colors duration-300"
                          onClick={() => openProductModal(product)}
                        >
                          {product.name}
                        </h3>
                        <div 
                          className="text-sm text-[#5a6b7e] mb-2"
                          onClick={() => openProductModal(product)}
                        >
                          {product.category}
                        </div>
                        <div 
                          className="flex items-center justify-center mb-3"
                          onClick={() => openProductModal(product)}
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
                            onClick={(e) => handleAddToCart(e, product)}
                            className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#8B4513] text-white rounded-md group-hover:bg-[#723a0f] transition-colors duration-300 text-sm font-semibold"
                            type="button"
                          >
                            Añadir al carrito <FiShoppingCart className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => scrollProducts('right')} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center focus:outline-none border border-gray-200"
                aria-label="Productos siguientes"
                type="button"
              >
                <FiChevronRight size={20} className="text-[#2d3b4a]" />
              </button>
            </div>
          </Suspense>
          <div className="text-center mt-8">
            <Link 
              to="/products" 
              className="inline-block px-6 py-2 bg-[#2d3b4a] text-white rounded-md hover:bg-[#1f2936] transition-colors duration-300 font-semibold"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categorías destacadas */}
      <section className="py-12 bg-[#f8f6f2]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-white/30 backdrop-blur-sm p-6 rounded-xl mb-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-center mb-4 text-[#2d3b4a]" data-aos="fade-up">
              Encuentra la receta ideal para tu mascota
            </h2>
            <p className="text-center text-[#5a6b7e] mb-4 max-w-2xl mx-auto">
              Cada una de nuestras categorías está pensada para satisfacer las necesidades específicas de tu mascota
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="block group"
              >
                <div
                  className="group bg-[#f8f3e0]/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#e6dfcf]/30 h-full"
                  data-aos="fade-up"
                  data-aos-delay={category.delay}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className={`w-full h-full scale-105 transition-transform duration-700 group-hover:scale-115 ${
                        category.title === "Comida para gatos" ? "object-cover" : "object-cover"
                      }`}
                      loading="lazy"
                      width="400"
                      height="250"
                      style={category.title === "Comida para gatos" ? {} : {}}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#2d3b4a] mb-2">{category.title}</h3>
                    <p className="text-[#5a6b7e] mb-3 text-sm">{category.description}</p>
                    <span
                      className="inline-flex items-center text-[#8B4513] font-semibold hover:text-[#723a0f] transition-colors"
                    >
                      Ver productos <FiArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sección de Beneficios */}
      <section className="py-12 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#2d3b4a]" data-aos="fade-up">
            Ingredientes únicos con beneficios excepcionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-[#f8f3e0] rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-[#2d3b4a]">{benefit.title}</h3>
                <p className="text-[#5a6b7e] text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-[#2d3b4a]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-white mb-3">
              ¡Únete a nuestra manada!
            </h2>
            <p className="text-white/90 mb-6 text-sm">
              Recibe ofertas exclusivas y consejos para el cuidado de tus mascotas
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8B4513] flex-1 max-w-md"
                required
                aria-label="Email para suscripción"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#8B4513] text-white rounded-full font-semibold hover:bg-[#723a0f] transition-all duration-300 disabled:opacity-70"
                aria-label="Suscribirse al newsletter"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Suscribirse'}
              </button>
            </form>

            {/* Mensaje de estado */}
            {subscriptionStatus && (
              <div className={`mt-4 ${subscriptionStatus === 'success' ? 'text-green-300' : 'text-red-300'}`}>
                {subscriptionStatus === 'success' ? 
                  '¡Gracias por suscribirte! Te enviaremos las mejores ofertas.' : 
                  'Hubo un error al procesar tu suscripción. Por favor, intenta de nuevo.'}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Modal de detalle de producto */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" 
          onClick={closeProductModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <div 
            className="bg-[#f8f3e0] rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 id="product-modal-title" className="text-xl font-bold text-[#2d3b4a]">{selectedProduct.name}</h2>
              <button 
                onClick={closeProductModal}
                className="p-2 text-gray-500 hover:text-[#8B4513] transition-colors"
                aria-label="Cerrar modal"
                type="button"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="max-h-60 object-contain scale-110"
                  loading="lazy"
                />
              </div>
              
              <div className="flex flex-col">
                <div className="mb-3">
                  <p className="text-sm font-medium text-[#8B4513] mb-1">Categoría</p>
                  <p className="text-[#5a6b7e]">{selectedProduct.category}</p>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-[#8B4513] mb-1">Precio</p>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-[#2d3b4a]">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${selectedProduct.originalPrice}
                      </span>
                    )}
                    {selectedProduct.discount > 0 && (
                      <span className="ml-2 bg-[#8B4513] text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{selectedProduct.discount}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-[#8B4513] mb-1">Valoración</p>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[#5a6b7e] text-sm">
                      {selectedProduct.rating} ({selectedProduct.numReviews} reseñas)
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#8B4513] mb-1">Descripción</p>
                  <p className="text-[#5a6b7e] text-sm">
                    Este producto está diseñado para proporcionar la mejor nutrición y comodidad a tu mascota. Elaborado con ingredientes de alta calidad para asegurar el bienestar y la salud.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={(e) => handleAddToCart(e, selectedProduct)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-[#8B4513] text-white rounded-md hover:bg-[#723a0f] transition-colors duration-300 text-sm font-semibold"
                      type="button"
                    >
                      <FiShoppingCart className="mr-2" /> Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
  