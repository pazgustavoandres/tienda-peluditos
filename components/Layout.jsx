import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#f8f6f2]">
      {/* Imagen de fondo de toda la página */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img 
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZGP31rxtsG5kZSe9RiRJu27u-OzeYj7KfywauHeG5Kf5WS71hBKTytLKPqsyfk4epz0FFgt71Eg1JOZar8MOBY0UKObbO8CCXKr-v1dc3vA6dNRzp0cFFThMUND9WJlRo8mCe-H69IDA/s1600/1a74a3c88e359c869e9b76fb0345116d.jpg" 
          alt="Fondo" 
          className="w-full h-full object-cover opacity-20"
          style={{ filter: 'brightness(0.8) contrast(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d3b4a]/60 to-[#f8f6f2] mix-blend-multiply"></div>
      </div>

      {/* Logo fijo en la esquina superior izquierda */}
      <div className="fixed top-24 left-6 z-50 w-40 h-40 rounded-full overflow-hidden shadow-md border-2 border-white/50 bg-white/90 p-1 flex items-center justify-center transition-all hover:scale-105">
        <img 
          src="https://static.wixstatic.com/media/46a26c_bb5a4e6e72b94dd3b87ca4b492b567be~mv2.png/v1/crop/x_137,y_188,w_1679,h_1679/fill/w_226,h_226,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/46a26c_bb5a4e6e72b94dd3b87ca4b492b567be~mv2.png" 
          alt="Logo Tienda Peluditos" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      {/* Contenido por encima de la imagen de fondo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>

      <style jsx global>{`
        /* Estilos globales para mantener consistencia en toda la aplicación */
        body {
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          color: #2d3b4a;
        }
        
        p {
          color: #5a6b7e;
        }
        
        .btn-primary {
          background-color: #8B4513;
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background-color: #723a0f;
        }
        
        .btn-secondary {
          background-color: #2d3b4a;
          color: white;
          transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
          background-color: #1f2936;
        }
        
        .card {
          background-color: #f8f3e0;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          border: 1px solid #e6dfcf;
        }
        
        .card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .section-light {
          background-color: rgba(248, 246, 242, 0.8);
          backdrop-filter: blur(5px);
        }
        
        .section-white {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(5px);
        }
        
        .section-dark {
          background-color: #2d3b4a;
          color: white;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }
        
        @keyframes floating {
          0% { transform: translateY(0px) scale(1.1); }
          50% { transform: translateY(-15px) scale(1.12); }
          100% { transform: translateY(0px) scale(1.1); }
        }
        
        @keyframes pulse-subtle {
          0% { filter: brightness(110%) contrast(110%); }
          50% { filter: brightness(120%) contrast(115%); }
          100% { filter: brightness(110%) contrast(110%); }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 