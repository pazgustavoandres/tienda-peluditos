import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArticleCard from '../components/ProductCard';

export default function BlogPage() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Datos simulados de artículos
  const articles = [
    {
      id: 1,
      title: 'Camlist lanza un ChatGPT para mascotas',
      date: '19 enero 2023',
      image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Vet Tech',
      excerpt: 'Camlist, el marketplace número 1 para mascotas en todo el mundo, anuncia el lanzamiento del primer asistente de IA con tecnología GPT-3 para la industria de mascotas.',
      slug: 'camlist-lanza-chatgpt-para-mascotas',
      author: {
        name: 'María Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 2,
      title: 'Tres de cada cinco europeos consideran importantes los productos para mascotas',
      date: '10 enero 2023',
      image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Estadísticas',
      excerpt: 'Un nuevo estudio revela que tres de cada cinco europeos consideran que los productos para mascotas son tan importantes como los productos para niños.',
      slug: 'europeos-consideran-importantes-productos-mascotas',
      author: {
        name: 'Carlos Gómez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 3,
      title: 'Tendencias que transformarán la industria de la salud de mascotas',
      date: '5 enero 2023',
      image: 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Salud',
      excerpt: 'Descubre las tendencias clave que transformarán la industria de la salud de mascotas en los próximos cinco años.',
      slug: 'tendencias-transformaran-industria-salud-mascotas',
      author: {
        name: 'Ana Martínez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 4,
      title: 'Machine Learning para la detección de Parkinson en roedores',
      date: '2 febrero 2023',
      image: 'https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Investigación',
      excerpt: 'Un modelo preliminar de detección y validación de patología de la enfermedad de Parkinson en roedores impulsado por aprendizaje automático.',
      slug: 'machine-learning-deteccion-parkinson-roedores',
      author: {
        name: 'Luis Sánchez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 5,
      title: 'Evotech: la inteligencia artificial que tiene olfato',
      date: '29 enero 2023',
      image: 'https://images.unsplash.com/photo-1583511655826-05700442cea8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Vet Tech',
      excerpt: 'La nueva tecnología Evotech utiliza inteligencia artificial para replicar el sentido del olfato, con aplicaciones prometedoras en la medicina veterinaria.',
      slug: 'evotech-inteligencia-artificial-olfato',
      author: {
        name: 'Pedro Alonso',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 6,
      title: 'Decodificando emociones en siete especies con pezuñas mediante IA',
      date: '25 enero 2023',
      image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Investigación',
      excerpt: 'Científicos están utilizando inteligencia artificial para decodificar las emociones en siete especies diferentes de animales con pezuñas.',
      slug: 'decodificando-emociones-especies-pezunas-ia',
      author: {
        name: 'María Rodríguez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 7,
      title: '¿Y si tu perro o gato te confiara sus secretos? La IA pronto podrá traducirlos',
      date: '20 enero 2023',
      image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Vet Tech',
      excerpt: 'Nuevos avances en inteligencia artificial están acercándonos a la posibilidad de traducir los sonidos y comportamientos de nuestras mascotas.',
      slug: 'ia-podra-traducir-secretos-perros-gatos',
      author: {
        name: 'Carlos Gómez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
    {
      id: 8,
      title: 'Cómo la innovación está ayudando a la industria del cuidado de mascotas',
      date: '15 enero 2023',
      image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Innovación',
      excerpt: 'A pesar de los desafíos económicos, la industria del cuidado de mascotas está prosperando gracias a la innovación y la tecnología.',
      slug: 'innovacion-ayudando-industria-cuidado-mascotas',
      author: {
        name: 'Ana Martínez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      }
    },
  ];

  // Filtrar artículos por categoría
  const filteredArticles = filter === 'all' 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === filter.toLowerCase());

  // Ordenar artículos
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'a-z':
        return a.title.localeCompare(b.title);
      case 'z-a':
        return b.title.localeCompare(a.title);
      default: // 'latest'
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Obtener categorías únicas
  const uniqueCategories = [...new Set(articles.map(article => article.category))];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero del Blog */}
      <section className="bg-blue-700 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">Blog sobre Mascotas</h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">
            Las últimas noticias y avances en el mundo de las mascotas y la tecnología veterinaria.
          </p>
        </div>
      </section>
      
      {/* Contenido Principal */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar de Filtros */}
            <div className="md:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                <h2 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-2">Filtros</h2>
                
                {/* Categorías */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-gray-900">Categorías</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="all"
                        name="category"
                        checked={filter === 'all'}
                        onChange={() => setFilter('all')}
                        className="h-4 w-4 text-blue-700 focus:ring-blue-500"
                      />
                      <label htmlFor="all" className="ml-2 text-gray-700">Todos los artículos</label>
                    </div>
                    
                    {uniqueCategories.map(category => (
                      <div className="flex items-center" key={category}>
                        <input
                          type="radio"
                          id={category.toLowerCase()}
                          name="category"
                          checked={filter === category.toLowerCase()}
                          onChange={() => setFilter(category.toLowerCase())}
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
                    {articles.slice(0, 3).map(article => (
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
                            <Link to={`/article/${article.slug}`}>{article.title}</Link>
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
              {/* Selector de Ordenamiento */}
              <div className="flex flex-wrap items-center justify-between mb-8 bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 mb-3 md:mb-0">Mostrando {sortedArticles.length} artículos</p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-gray-600 mr-2">Ordenar por:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:ring-blue-700 focus:border-blue-700"
                  >
                    <option value="latest">Más recientes</option>
                    <option value="oldest">Más antiguos</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                  </select>
                </div>
              </div>
              
              {/* Artículos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Paginación */}
              <div className="mt-10 flex justify-center">
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
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
} 