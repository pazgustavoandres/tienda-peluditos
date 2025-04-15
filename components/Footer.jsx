// src/components/Footer.jsx
import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <p className="mb-2">Teléfono: +56 9 1234 5678</p>
            <p className="mb-2">Email: info@marketpetgus.cl</p>
            <p>Dirección: Av. Ejemplo 123, Santiago, Chile</p>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-500 transition-colors"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Market Pet Gus. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <FaCcVisa size={28} />
            <FaCcMastercard size={28} />
            <FaCcPaypal size={28} />
            <FaCcAmex size={28} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
