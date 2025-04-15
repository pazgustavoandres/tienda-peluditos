// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMenu, FiX, FiShoppingCart, FiUser, FiChevronDown } from "react-icons/fi";
import { useCart } from "../src/context/CartContext";
import CartDrawer from "./CartDrawer";
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { cartCount, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(user.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para acceder al carrito');
      navigate('/login');
      return;
    }
    setCartDrawerOpen(true);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'client') {
        navigate('/client-profile');
      } else if (user.role === 'server') {
        navigate('/server-profile');
      }
    }
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
    setCartDrawerOpen(false);
    setUserMenuOpen(false);
    toast.success('Has cerrado sesión correctamente');
    navigate('/');
  };

  return (
    <nav className="bg-[#f8f3e0] shadow-sm rounded-b-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src="/my-app/perro-tejonero.png" 
              alt="Logo Perro" 
              className="h-14 w-14 object-contain mr-2"
            />
            <span className="text-xl font-bold text-[#8B4513]">Market Pet Gus</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 font-medium transition">Inicio</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-700 font-medium transition">Productos</Link>
            <Link to="/dog-food" className="text-gray-700 hover:text-blue-700 font-medium transition">Comida para Perro</Link>
            <Link to="/cat-food" className="text-gray-700 hover:text-blue-700 font-medium transition">Comida para Gato</Link>
            <Link to="/accessories" className="text-gray-700 hover:text-blue-700 font-medium transition">Accesorios</Link>
            <Link to="/clothing" className="text-gray-700 hover:text-blue-700 font-medium transition">Ropa</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-blue-700"
              aria-label="Buscar"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <button 
              onClick={handleCartClick}
              className={`relative text-gray-700 hover:text-blue-700 ${
                !isAuthenticated ? 'cursor-not-allowed' : ''
              }`}
              disabled={!isAuthenticated}
              aria-label="Carrito"
            >
              <FiShoppingCart className="w-5 h-5" />
              {isAuthenticated && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            
            {isAuthenticated && (
              <div className="relative group">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <FiUser className="w-5 h-5" />
                  <span>Mi Perfil</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Ver Perfil
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button 
              onClick={handleCartClick}
              className={`relative text-gray-700 hover:text-blue-700 mr-3 ${
                !isAuthenticated ? 'cursor-not-allowed' : ''
              }`}
              disabled={!isAuthenticated}
              aria-label="Carrito"
            >
              <FiShoppingCart className="w-5 h-5" />
              {isAuthenticated && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-blue-700 mr-3"
              aria-label="Buscar"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <div className="relative" ref={menuRef}>
              <button 
                className="text-gray-700 hover:text-blue-700" 
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Usuario"
              >
                {mobileMenuOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={handleProfileClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Mi Perfil
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <span>Cerrar Sesión</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                        Login
                      </Link>
                      <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                        Registro
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="py-3 border-t border-gray-200">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="w-5 h-5 text-gray-500 absolute left-3 top-3" />
              <button 
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchOpen(false)}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {[
                { to: "/", label: "Inicio" },
                { to: "/products", label: "Productos" },
                { to: "/dog-food", label: "Comida para Perro" },
                { to: "/cat-food", label: "Comida para Gato" },
                { to: "/accessories", label: "Accesorios" },
                { to: "/clothing", label: "Ropa" }
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="text-gray-700 hover:text-blue-700 font-medium px-4 py-2 transition">
                  {label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleProfileClick}
                    className="text-left text-gray-700 hover:text-blue-700 font-medium px-4 py-2 transition w-full"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 font-medium px-4 py-2 transition w-full"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-blue-700 font-medium px-4 py-2 transition">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-blue-700 font-medium px-4 py-2 transition">
                    Registro
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
    </nav>
  );
}
