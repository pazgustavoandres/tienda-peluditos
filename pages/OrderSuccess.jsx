import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FiCheckCircle, FiHome, FiShoppingBag } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function OrderSuccess() {
  // Generar un número de pedido aleatorio para la simulación
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  
  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 800,
      once: true
    });
    
    // Scroll hacia arriba al cargar la página
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div 
            className="bg-[#f8f3e0]/70 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-[#e6dfcf]/60 mb-8"
            data-aos="fade-up"
          >
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-[#2d3b4a] mb-4">¡Pedido Completado!</h1>
              <p className="text-[#5a6b7e] mb-6 text-lg">
                Gracias por tu compra. Hemos recibido tu pedido correctamente.
              </p>
              
              <div 
                className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 inline-block"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2 className="text-xl font-semibold text-[#2d3b4a] mb-2">Número de Pedido:</h2>
                <p className="text-2xl font-bold text-[#8B4513]">#{orderNumber}</p>
              </div>
              
              <div className="max-w-lg mx-auto text-center mb-8">
                <h3 className="text-lg font-semibold text-[#2d3b4a] mb-3">Detalles de tu pedido</h3>
                <p className="text-[#5a6b7e] mb-4">
                  Recibirás un correo electrónico con todos los detalles de tu compra y la confirmación del pedido. Puedes consultar el estado de tu envío en cualquier momento desde tu perfil.
                </p>
                <div className="border-t border-[#e6dfcf] pt-4 mt-4">
                  <p className="text-[#5a6b7e]">
                    El tiempo estimado de entrega es de 3-5 días hábiles.
                  </p>
                </div>
              </div>
              
              <div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Link 
                  to="/" 
                  className="flex items-center justify-center px-6 py-3 bg-[#2d3b4a] text-white rounded-full hover:bg-[#1f2936] transition-all duration-300"
                >
                  <FiHome className="mr-2" /> Ir al inicio
                </Link>
                <Link 
                  to="/client-profile" 
                  className="flex items-center justify-center px-6 py-3 bg-[#8B4513] text-white rounded-full hover:bg-[#723a0f] transition-all duration-300"
                >
                  <FiShoppingBag className="mr-2" /> Ver mis pedidos
                </Link>
              </div>
            </div>
          </div>
          
          {/* Productos recomendados */}
          <div className="mt-12" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-center text-[#2d3b4a] mb-8">También podría interesarte</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Royal Canin Maxi Adult",
                  price: 52.99,
                  image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg",
                  category: "Perros"
                },
                {
                  id: 2,
                  name: "Juguete interactivo para gatos",
                  price: 19.99,
                  image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=70",
                  category: "Gatos"
                },
                {
                  id: 3,
                  name: "Cama acolchada para perros",
                  price: 34.99,
                  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUXkQQZQMgiK1jyBdR9MG0G-TpgR9KreOmGw&usqp=CAU",
                  category: "Perros"
                }
              ].map(product => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-[#f8f3e0]/40 backdrop-blur-sm rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#e6dfcf]/30"
                  data-aos="fade-up"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#2d3b4a] group-hover:text-[#8B4513] transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[#8B4513] font-bold">${product.price}</span>
                      <span className="text-sm text-[#5a6b7e]">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 