import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { FiSearch, FiArrowRight, FiClock, FiCalendar, FiUser } from 'react-icons/fi';

// Datos de ejemplo para los artículos
const dummyArticles = [
  {
    id: 1,
    title: "Camlist lanza ChatGPT para mascotas: Revolución en el cuidado animal",
    date: "15 Mayo 2023",
    image: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    category: "Tecnología",
    excerpt: "Descubre cómo la inteligencia artificial está transformando la comunicación con nuestras mascotas. La nueva app de Camlist permite resolver dudas sobre el comportamiento animal al instante.",
    slug: "camlist-chatgpt-mascotas",
    author: "María García"
  },
  {
    id: 2,
    title: "Los 10 consejos esenciales para el cuidado dental de tu perro",
    date: "3 Mayo 2023",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdGVldGh8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    category: "Perros",
    excerpt: "Mantener la salud dental de tu perro es fundamental para su bienestar general. Aprende las mejores prácticas para prevenir problemas y mantener su sonrisa brillante.",
    slug: "consejos-cuidado-dental-perros",
    author: "Carlos Martínez"
  },
  {
    id: 3,
    title: "Gatos y estrés: Señales que indican que tu felino necesita ayuda",
    date: "28 Abril 2023",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Gatos",
    excerpt: "Los gatos son maestros en ocultar su malestar. Conoce las señales sutiles que indican que tu gato podría estar sufriendo de estrés y descubre cómo ayudarlo.",
    slug: "gatos-estres-senales",
    author: "Ana López"
  },
  {
    id: 4,
    title: "Razas de conejos más populares como mascotas domésticas",
    date: "20 Abril 2023",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFiYml0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    category: "Mascotas Exóticas",
    excerpt: "Los conejos son mascotas encantadoras que ganan popularidad. Descubre las razas más adecuadas para tener en casa y sus características específicas.",
    slug: "razas-conejos-populares",
    author: "Pedro Sánchez"
  },
  {
    id: 5,
    title: "Nutrición equina: Guía completa para propietarios principiantes",
    date: "15 Abril 2023",
    image: "https://images.unsplash.com/photo-1553284965-fa25bd6a6e10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9yc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    category: "Caballos",
    excerpt: "La alimentación adecuada es crucial para la salud de tu caballo. Esta guía te ayudará a entender los principios básicos de la nutrición equina y cómo implementarlos.",
    slug: "nutricion-equina-principiantes",
    author: "Laura Fernández"
  },
  {
    id: 6,
    title: "Avances en telemedicina veterinaria: Consultas desde casa",
    date: "10 Abril 2023",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHZldGVyaW5hcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    category: "Vet Tech",
    excerpt: "La telemedicina está transformando la atención veterinaria. Conoce cómo puedes acceder a consultas profesionales para tu mascota sin salir de casa.",
    slug: "telemedicina-veterinaria-avances",
    author: "Diego Ramírez"
  }
];

// Categorías para el filtro
const categories = [
  "Todas", "Perros", "Gatos", "Caballos", "Mascotas Exóticas", "Vet Tech", "Tecnología"
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  const filteredArticles = dummyArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Artículo destacado de Camlist con ChatGPT para mascotas
  const featuredArticle = {
    id: 1,
    title: "Camlist lanza ChatGPT para mascotas: Revolución en el cuidado animal",
    date: "15 Mayo 2023",
    image: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80",
    category: "Tecnología",
    excerpt: "Camlist, el marketplace número 1 para mascotas en todo el mundo, anuncia el lanzamiento del primer asistente de IA con tecnología GPT-3 para la industria de mascotas.",
    slug: "camlist-chatgpt-mascotas",
    author: "María García"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Blog - Tienda Peluditos</title>
        <meta name="description" content="Artículos y noticias sobre el cuidado de mascotas, consejos veterinarios y nuevas tecnologías para el bienestar animal." />
      </Helmet>
      
      <Navbar />
      
      {/* Hero del Blog */}
      <section className="bg-blue-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Blog Peluditos</h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">
            Descubre los últimos artículos sobre el cuidado de mascotas, consejos veterinarios y 
            las nuevas tecnologías que están transformando el bienestar animal.
          </p>
        </div>
      </section>
      
      {/* Artículo destacado de Camlist y ChatGPT para mascotas */}
      <section className="py-8 md:py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <article>
            <Link to={`/blog/${featuredArticle.slug}`}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3">
                  <span className="inline-block bg-blue-700 text-white px-3 py-1 text-xs font-medium rounded mb-3">
                    {featuredArticle.category}
                  </span>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 hover:text-blue-700 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-1" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUser className="mr-1" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>5 min de lectura</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{featuredArticle.excerpt}</p>
                  
                  <span className="text-blue-700 font-medium inline-flex items-center hover:underline">
                    Leer más
                    <FiArrowRight className="ml-2" />
                  </span>
                </div>
                
                <div className="md:col-span-2 order-first md:order-last">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img 
                      src={featuredArticle.image} 
                      alt={featuredArticle.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>
      
      {/* Contenido principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar de Filtros */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                {/* Búsqueda */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-gray-900">Buscar</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar artículos..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                
                {/* Categorías */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-gray-900">Categorías</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all"
                        name="category"
                        checked={selectedCategory === 'Todas'}
                        onChange={() => setSelectedCategory('Todas')}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="all" className="ml-2 text-gray-700">Todos los artículos</label>
                    </div>
                    
                    {categories.filter(cat => cat !== 'Todas').map(category => (
                      <div className="flex items-center" key={category}>
                        <input
                          type="radio"
                          id={category.toLowerCase()}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-blue-700 focus:ring-blue-500"
                        />
                        <label htmlFor={category.toLowerCase()} className="ml-2 text-gray-700">{category}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Artículos populares */}
                <div>
                  <h3 className="font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">Artículos populares</h3>
                  <div className="space-y-4">
                    {dummyArticles.slice(0, 3).map(article => (
                      <div key={article.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-16 h-16 relative">
                          <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover rounded" 
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 hover:text-blue-700 transition-colors line-clamp-2">
                            <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                          </h4>
                          <span className="text-xs text-gray-500">{article.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lista de Artículos */}
            <div className="md:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-2">Todos los artículos</h2>
                <p className="text-gray-600 mb-4">Explorando {filteredArticles.length} artículos</p>
                
                {/* Filtros rápidos (pills) */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Grid de artículos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10 bg-white rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No se encontraron artículos</h3>
                    <p className="text-gray-500">Intenta con otra búsqueda o categoría diferente.</p>
                  </div>
                )}
              </div>
              
              {/* Paginación */}
              {filteredArticles.length > 0 && (
                <div className="flex justify-center">
                  <nav className="inline-flex">
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-l-md text-sm">
                      Anterior
                    </button>
                    <button className="bg-blue-700 text-white px-4 py-2 text-sm">1</button>
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm">2</button>
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm">3</button>
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-r-md text-sm">
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Suscríbete a nuestro boletín</h2>
            <p className="text-gray-600 mb-6">Recibe las últimas noticias sobre mascotas y tecnología veterinaria directamente en tu correo.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage; 