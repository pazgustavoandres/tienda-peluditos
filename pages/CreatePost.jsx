import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext'; // Asegúrate de que tengas este contexto para el carrito
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart, totalPrice } = useContext(CartContext); // Obtenemos el carrito y el precio total del contexto

  // Función para manejar el envío del formulario
  const handleCheckout = (e) => {
    e.preventDefault();
    // Aquí podrías hacer la lógica de pago (con API, etc.)
    alert('Compra completada!');
  };

  return (
    <div className="checkout-page">
      <h1>Finalizar Compra</h1>

      {/* Resumen del carrito */}
      <div className="cart-summary">
        <h2>Resumen del carrito</h2>
        {cart.length === 0 ? (
          <p>No tienes productos en tu carrito.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="product-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>Cantidad: {item.count}</p>
                    <p>Precio: ${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Precio total */}
        <div className="total-price">
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>

      {/* Formulario de envío */}
      <form onSubmit={handleCheckout} className="checkout-form">
        <h2>Detalles de Envío</h2>
        <label>
          Nombre:
          <input type="text" required />
        </label>
        <label>
          Dirección:
          <input type="text" required />
        </label>
        <label>
          Ciudad:
          <input type="text" required />
        </label>
        <label>
          Teléfono:
          <input type="tel" required />
        </label>
        <button type="submit">Finalizar compra</button>
      </form>

      {/* Volver al carrito */}
      <Link to="/cart" className="back-to-cart">
        Volver al carrito
      </Link>
    </div>
  );
};

export default Checkout;
