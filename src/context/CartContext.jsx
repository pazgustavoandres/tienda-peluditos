// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Si el producto ya existe, incrementar la cantidad
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems[existingItemIndex];
      updatedCartItems[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + 1
      };
      setCartItems(updatedCartItems);
    } else {
      // Si es un producto nuevo, añadirlo con cantidad = 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Calcular subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  
  // Gastos de envío fijos (podrías hacer esto dinámico basado en la ubicación, peso, etc.)
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  // Total
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      subtotal,
      shipping,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}

export { CartContext };
