import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../routes.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50
    });
  }, []);

  return (
    <BrowserRouter basename="/my-app">
      <CartProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4CAF50',
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: '#F44336',
              },
            },
          }}
        />
        <div className="min-h-screen bg-gray-100">
          <div className="container mx-auto p-4">
            <AppRoutes />
          </div>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
