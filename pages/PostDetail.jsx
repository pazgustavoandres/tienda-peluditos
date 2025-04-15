import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiCalendar, FiUser, FiClock, FiShare2, FiHeart, FiMessageSquare } from 'react-icons/fi';

// Artículos de ejemplo
const dummyArticles = [
  {
    id: 1,
    title: "Camlist lanza ChatGPT para mascotas: Revolución en el cuidado animal",
    date: "15 Mayo 2023",
    image: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHBldHN8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80",
    category: "Tecnología",
    content: `
      <p><strong>Camlist, el marketplace número 1 para mascotas en todo el mundo, anuncia el lanzamiento del primer asistente de IA con tecnología GPT-3 para la industria de mascotas.</strong></p>
      
      <p>Camlist ha anunciado el lanzamiento de un chatbot tipo ChatGPT disponible 24/7, llamado "Buddy", para todos los usuarios de su plataforma. Esta es una adición emocionante al marketplace de mascotas basado en video, que busca ser la forma más segura de reubicar mascotas en los EE. UU. y el mundo.</p>
      
      <p>Sobre el lanzamiento del chatbot impulsado por GPT-3, el CEO de Camlist, Moustafa Mahmoud, dijo: "Nuestra visión desde el día 1 es ser la forma más segura para que cualquiera reubique una mascota. Dado que la mayoría de nuestros usuarios son padres primerizos de mascotas, generalmente tienen muchas preguntas sobre cómo cuidar a su nuevo amigo peludo. Con el crecimiento viral de ChatGPT, queríamos traer la misma experiencia a nuestros actuales y futuros padres de mascotas. Piense en él como ChatGPT para la industria de mascotas".</p>
      
      <p>Desde su lanzamiento en los EE. UU. hace apenas unos meses, Camlist ya ha ganado una popularidad significativa en la industria de mascotas, con miles de criadores de mascotas estadounidenses y futuros padres de mascotas acudiendo a la plataforma a diario. "Tenemos miles de usuarios utilizando Camlist para reubicar a sus mascotas de la manera más segura posible a diario. Cada función que lanzamos está cuidadosamente adaptada a las necesidades de nuestra comunidad, con un enfoque principal en la seguridad y el bienestar animal, por lo que estamos muy emocionados de traer un nuevo asistente de mascotas impulsado por A.I. disponible 24/7 a nuestra industria", dijo Moustafa.</p>
      
      <p>Este es un paso importante para el marketplace que ya ha introducido varias innovaciones a la industria de mascotas, siendo la más reciente las funciones sociales que conectan a todos sus usuarios, además de otras innovaciones para criadores y padres de mascotas como transmisión en vivo, un sistema de calificación para criadores, listados de video, videollamadas, financiamiento al 0%, un club de reembolso para padres de mascotas y varios otros. Esta combinación única de características resuelve muchos de los problemas que tanto los padres de mascotas como los criadores enfrentan durante el proceso de reubicación de una mascota y los ayuda incluso más allá de eso.</p>
      
      <p>El chatbot resultó ser increíblemente popular entre los clientes de Camlist, dijo: "Buddy fue un éxito rotundo entre nuestros usuarios, y los casos de uso son infinitos. Por ejemplo, algunos futuros padres de mascotas comenzaron a usar a Buddy para hacer investigaciones, como preguntar qué raza es mejor para ellos, dadas sus condiciones de vida y horarios de trabajo actuales, y los padres de mascotas existentes comenzaron a preguntarle cómo proporcionar un mejor cuidado, como cómo entrenar a su nuevo amigo peludo o cómo desarrollar ciertos hábitos. Buddy está disponible dentro de la aplicación, así como un bot independiente de WhatsApp".</p>
      
      <p>Agregó: "Muy pronto, cualquier persona en los EE. UU. podrá llamar a un número gratuito y hablar con Buddy por teléfono y tener una conversación con él. Podrán hacerle cualquier pregunta por teléfono y recibir una respuesta en la llamada también".</p>
      
      <p>Para crear conciencia sobre su misión, Camlist ofrece varias ventajas a cualquier comprador que reubique a su bebé peludo a través de la aplicación, como 1 año de comida para mascotas gratis, acceso a un club de reembolso que les ayuda a obtener un reembolso de hasta el 30% en cualquier compra que realicen para su mascota (incluidos alimentos, suministros, juguetes, etc.), descuentos especiales en seguros y el servicio veterinario gratuito 24/7 recientemente introducido. Moustafa dijo: "Comenzamos a ofrecer estas ventajas para promover nuestra misión de reubicación segura. Esperamos que esto genere conciencia sobre nuestra misión en toda la comunidad".</p>
      
      <p>Camlist cree que su plataforma basada en video tiene el potencial de cambiar la forma en que las personas reubican mascotas en los EE. UU. y en todo el mundo, haciendo que todo el proceso sea mucho más seguro para todos los participantes, con un enfoque especial en el bienestar animal. Esperan que más personas opten por usar la plataforma cuando estén considerando reubicar una mascota para apoyar esta misión y disfrutar de una experiencia más segura y conveniente.</p>
      
      <p><strong>Acerca de Camlist:</strong> Camlist es el primer marketplace de video para mascotas del mundo. Habiendo lanzado a principios de 2020, ahora están activos en 3 países, siendo el más reciente los EE. UU. Camlist ahora apoya a miles de compradores y vendedores en su aplicación y ha introducido su único producto de financiamiento de mascotas con 0% de interés, así como una serie de características que brindan a compradores y vendedores una forma más segura y conveniente de reubicar sus mascotas. La aplicación está disponible tanto en iOS como en Android.</p>
      
      <p>Fuente: <a href="https://techbullion.com/camlist-launches-a-chatgpt-for-pets/" target="_blank" rel="noopener noreferrer">https://techbullion.com/camlist-launches-a-chatgpt-for-pets/</a></p>
    `,
    excerpt: "Descubre cómo la inteligencia artificial está transformando la comunicación con nuestras mascotas. La nueva app de Camlist permite resolver dudas sobre el comportamiento animal al instante.",
    slug: "camlist-chatgpt-mascotas",
    author: "María García"
  },
  {
    id: 2,
    title: "Los 10 consejos esenciales para el cuidado dental de tu perro",
    date: "3 Mayo 2023",
    image: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwdGVldGh8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80",
    category: "Perros",
    content: `
      <p>Mantener la salud dental de tu perro es fundamental para su bienestar general. Los problemas dentales no tratados pueden llevar a dolor, infecciones y problemas de salud más graves.</p>
      <p>Aquí te presentamos los 10 consejos esenciales para cuidar los dientes de tu perro:</p>
      <ol>
        <li><strong>Cepillado regular:</strong> Intenta cepillar los dientes de tu perro al menos 2-3 veces por semana. Usa una pasta dental específica para perros, ya que las pastas humanas pueden ser tóxicas para ellos.</li>
        <li><strong>Juguetes dentales:</strong> Proporciona juguetes diseñados para la limpieza dental que ayuden a reducir la placa mientras juegan.</li>
        <li><strong>Golosinas dentales:</strong> Hay snacks específicos que ayudan a reducir el sarro y refrescan el aliento.</li>
        <li><strong>Dieta adecuada:</strong> Algunos alimentos secos están diseñados específicamente para promover la salud dental.</li>
        <li><strong>Revisiones veterinarias:</strong> Programa revisiones dentales regulares con tu veterinario.</li>
        <li><strong>Limpieza profesional:</strong> Según la raza y el estado dental, tu perro podría necesitar limpiezas profesionales periódicas.</li>
        <li><strong>Observa cambios en el comportamiento:</strong> Si tu perro muestra signos de dolor al comer o mal aliento persistente, podría indicar problemas dentales.</li>
        <li><strong>Empieza temprano:</strong> Acostumbra a tu cachorro al cepillado dental desde pequeño.</li>
        <li><strong>Productos con sello de aprobación:</strong> Busca productos dentales con sellos de organizaciones veterinarias reconocidas.</li>
        <li><strong>Agua aditiva:</strong> Existen productos que se añaden al agua para ayudar a controlar la placa y el sarro.</li>
      </ol>
      <p>Recuerda que la prevención es clave en la salud dental de tu perro. Establecer una rutina de cuidado dental desde temprano te ayudará a evitar problemas más serios en el futuro.</p>
    `,
    excerpt: "Mantener la salud dental de tu perro es fundamental para su bienestar general. Aprende las mejores prácticas para prevenir problemas y mantener su sonrisa brillante.",
    slug: "consejos-cuidado-dental-perros",
    author: "Carlos Martínez"
  }
];

export default function PostDetail() {
  const { id, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Artículos relacionados - normalmente vendrían de una API
  const relatedArticles = dummyArticles.filter(article => article.slug !== slug).slice(0, 3);

  useEffect(() => {
    // Simulando una carga de datos
    setLoading(true);
    
    setTimeout(() => {
      if (slug) {
        // Si tenemos un slug, buscamos el artículo del blog
        const article = dummyArticles.find(article => article.slug === slug);
        if (article) {
          setPost(article);
        }
      } else if (id) {
        // Buscar post por ID (para la ruta /post/:id)
        // Esta lógica dependería de tus datos reales
        setPost({
          id: 1,
          title: "Título del post",
          content: "Contenido del post...",
          date: "10 Abril 2023",
          author: "Autor del Post"
        });
      }
      
      setLoading(false);
    }, 500);
  }, [id, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h1>
            <p className="mb-6">El artículo que estás buscando no existe o ha sido eliminado.</p>
            <Link to="/blog" className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition">
              Volver al blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Imagen destacada */}
        <div className="w-full h-[400px] md:h-[500px] relative">
          <img 
            src={post.image || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              {post.category && (
                <span className="inline-block bg-blue-700 text-white px-3 py-1 text-sm font-medium rounded mb-3">
                  {post.category}
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  <span>5 min de lectura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contenido del artículo */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <article className="md:w-2/3">
              {/* Botones de compartir */}
              <div className="flex gap-3 mb-6">
                <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <FiShare2 />
                </button>
                <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                  <FiHeart />
                </button>
                <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                  <FiMessageSquare />
                </button>
              </div>
              
              {/* Contenido principal */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              
              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">Etiquetas:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Mascotas</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Tecnología</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">IA</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Bienestar Animal</span>
                </div>
              </div>
              
              {/* Autor */}
              <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <img 
                    src="https://i.pravatar.cc/100" 
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{post.author}</h3>
                    <p className="text-gray-600 mt-1">
                      Periodista especializado en tecnología y mascotas con más de 5 años de experiencia
                      escribiendo sobre innovaciones que mejoran la vida de los animales.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Comentarios */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-6">Comentarios (2)</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://i.pravatar.cc/150?img=11" 
                        alt="Comentarista" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Laura Mendoza</h4>
                          <span className="text-gray-500 text-sm">hace 2 días</span>
                        </div>
                        <p className="mt-1 text-gray-700">
                          ¡Esto es increíble! Ya estoy usando Buddy para mi gato y ha sido muy útil para entender mejor sus comportamientos.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-3">
                      <img 
                        src="https://i.pravatar.cc/150?img=8" 
                        alt="Comentarista" 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">Carlos Ruiz</h4>
                          <span className="text-gray-500 text-sm">hace 5 días</span>
                        </div>
                        <p className="mt-1 text-gray-700">
                          Me encanta cómo la tecnología está ayudando a mejorar la vida de nuestras mascotas. Definitivamente probaré Camlist.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Formulario de comentarios */}
                <div className="mt-8">
                  <h4 className="font-semibold mb-4">Deja un comentario</h4>
                  <form>
                    <div className="mb-4">
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-700 focus:border-blue-700"
                        rows="4"
                        placeholder="Escribe tu comentario..."
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input 
                        type="text" 
                        placeholder="Nombre" 
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-700 focus:border-blue-700"
                      />
                      <input 
                        type="email" 
                        placeholder="Email" 
                        className="p-3 border border-gray-300 rounded-lg focus:ring-blue-700 focus:border-blue-700"
                      />
                    </div>
                    <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                      Publicar comentario
                    </button>
                  </form>
                </div>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="md:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Artículos relacionados</h3>
                <div className="space-y-6">
                  {relatedArticles.map(article => (
                    <div key={article.id} className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 relative">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                      </div>
    <div>
                        <h4 className="font-medium text-sm hover:text-blue-700 transition-colors line-clamp-2">
                          <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                        </h4>
                        <span className="text-gray-500 text-xs">{article.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold mb-6">Suscríbete al boletín</h3>
                  <p className="text-gray-600 mb-4">Recibe los últimos artículos en tu correo.</p>
                  <form>
                    <input 
                      type="email" 
                      placeholder="Tu email" 
                      className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-blue-700 focus:border-blue-700"
                    />
                    <button className="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                      Suscribirme
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
