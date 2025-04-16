import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { FaBox, FaMapMarkerAlt, FaTruck, FaCheckCircle, FaFilePdf, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Orders() {
  const { currentUser } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);
  
  // Datos de ejemplo de pedidos
  const [orders, setOrders] = useState([
    {
      id: "ORD-2023-001",
      date: "2023-11-15",
      total: 125.97,
      status: "entregado",
      paymentMethod: "Tarjeta de crédito",
      shippingAddress: {
        name: "Casa",
        recipient: "Juan Pérez",
        street: "Av. Providencia 1234",
        apartment: "Depto 301",
        city: "Santiago",
        region: "Región Metropolitana"
      },
      items: [
        {
          id: 1,
          name: "Taste of the Wild Pacific Stream Canine",
          price: 58.99,
          quantity: 1,
          image: "https://bestforpets.cl/tienda/12793-large_default/taste-of-the-wild-pacific-stream.jpg"
        },
        {
          id: 5,
          name: "Collar para perro Premium",
          price: 22.99,
          quantity: 2,
          image: "https://m.media-amazon.com/images/I/71kv-NJeszL.jpg"
        }
      ],
      trackingNumber: "SP123456789CL",
      deliveryDate: "2023-11-20"
    },
    {
      id: "ORD-2023-002",
      date: "2023-12-03",
      total: 89.98,
      status: "en camino",
      paymentMethod: "PayPal",
      shippingAddress: {
        name: "Oficina",
        recipient: "Juan Pérez",
        street: "Av. Las Condes 9876",
        apartment: "Piso 4, Oficina 405",
        city: "Santiago",
        region: "Región Metropolitana"
      },
      items: [
        {
          id: 3,
          name: "Taste of the Wild Sierra Mountain Canine",
          price: 59.99,
          quantity: 1,
          image: "https://m.media-amazon.com/images/I/81+JbKvBZSL.jpg"
        },
        {
          id: 8,
          name: "Juguete interactivo para gato",
          price: 14.99,
          quantity: 2,
          image: "https://m.media-amazon.com/images/I/71J71nV6WeL.jpg"
        }
      ],
      trackingNumber: "SP987654321CL",
      estimatedDelivery: "2023-12-08"
    },
    {
      id: "ORD-2023-003",
      date: "2023-12-10",
      total: 62.99,
      status: "procesando",
      paymentMethod: "Transferencia bancaria",
      shippingAddress: {
        name: "Casa",
        recipient: "Juan Pérez",
        street: "Av. Providencia 1234",
        apartment: "Depto 301",
        city: "Santiago",
        region: "Región Metropolitana"
      },
      items: [
        {
          id: 2,
          name: "Taste of the Wild Canyon River Feline",
          price: 56.99,
          quantity: 1,
          image: "https://m.media-amazon.com/images/I/81B2elNmomL.jpg"
        },
        {
          id: 6,
          name: "Pack de juguetes para gato",
          price: 6.00,
          quantity: 1,
          image: "https://m.media-amazon.com/images/I/71nYTXG7YjL.jpg"
        }
      ]
    }
  ]);
  
  const toggleOrderDetails = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  const getStatusInfo = (status) => {
    switch (status) {
      case "procesando":
        return {
          label: "Procesando",
          color: "bg-blue-100 text-blue-800",
          icon: <FaBox className="mr-1" />
        };
      case "en camino":
        return {
          label: "En camino",
          color: "bg-yellow-100 text-yellow-800",
          icon: <FaTruck className="mr-1" />
        };
      case "entregado":
        return {
          label: "Entregado",
          color: "bg-green-100 text-green-800",
          icon: <FaCheckCircle className="mr-1" />
        };
      default:
        return {
          label: status,
          color: "bg-gray-100 text-gray-800",
          icon: null
        };
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#2d3b4a] mb-6">Mis Pedidos</h1>
        
        {!currentUser ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">Inicia sesión para ver tus pedidos</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a tu historial de pedidos</p>
            <Link 
              to="/login" 
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#f8f3e0]/70 rounded-lg p-8 text-center">
            <h2 className="text-xl font-bold text-[#8B4513] mb-4">No tienes pedidos</h2>
            <p className="text-gray-600 mb-6">Aún no has realizado ningún pedido</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-[#8B4513] text-white rounded-lg font-medium"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div 
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div 
                  className="flex flex-wrap justify-between items-center p-4 md:p-6 cursor-pointer"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex items-center mb-2 md:mb-0">
                    <div className="mr-4">
                      {expandedOrder === order.id ? (
                        <FaChevronUp className="text-gray-500" />
                      ) : (
                        <FaChevronDown className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pedido {order.id}</p>
                      <p className="font-medium">{formatDate(order.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold text-[#2d3b4a]">{formatPrice(order.total)}</p>
                    </div>
                    
                    <div className={`${getStatusInfo(order.status).color} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
                      {getStatusInfo(order.status).icon}
                      {getStatusInfo(order.status).label}
                    </div>
                  </div>
                </div>
                
                {expandedOrder === order.id && (
                  <div className="px-4 md:px-6 pb-6 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Detalles del pedido</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">Método de pago:</span>
                            <span>{order.paymentMethod}</span>
                          </p>
                          {order.trackingNumber && (
                            <p className="flex justify-between text-sm py-1">
                              <span className="text-gray-500">Número de seguimiento:</span>
                              <span>{order.trackingNumber}</span>
                            </p>
                          )}
                          {order.estimatedDelivery && (
                            <p className="flex justify-between text-sm py-1">
                              <span className="text-gray-500">Entrega estimada:</span>
                              <span>{formatDate(order.estimatedDelivery)}</span>
                            </p>
                          )}
                          {order.deliveryDate && (
                            <p className="flex justify-between text-sm py-1">
                              <span className="text-gray-500">Entregado el:</span>
                              <span>{formatDate(order.deliveryDate)}</span>
                            </p>
                          )}
                        </div>
                        
                        <h3 className="font-medium text-gray-700 mb-2 mt-4">Dirección de envío</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-[#8B4513] mt-1 mr-2" />
                            <div>
                              <p className="font-medium">{order.shippingAddress.name} - {order.shippingAddress.recipient}</p>
                              <p className="text-sm text-gray-600">{order.shippingAddress.street}</p>
                              {order.shippingAddress.apartment && (
                                <p className="text-sm text-gray-600">{order.shippingAddress.apartment}</p>
                              )}
                              <p className="text-sm text-gray-600">
                                {order.shippingAddress.city}, {order.shippingAddress.region}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2">Productos</h3>
                        <div className="space-y-3">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center bg-gray-50 p-3 rounded-lg">
                              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-white border border-gray-200">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                              </div>
                              <div className="ml-4 flex-grow">
                                <p className="font-medium text-sm">{item.name}</p>
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                                  <p className="font-medium">{formatPrice(item.price)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <p className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">Subtotal:</span>
                            <span>{formatPrice(order.total * 0.81)}</span>
                          </p>
                          <p className="flex justify-between text-sm py-1">
                            <span className="text-gray-500">IVA (19%):</span>
                            <span>{formatPrice(order.total * 0.19)}</span>
                          </p>
                          <p className="flex justify-between font-bold text-[#2d3b4a] py-1 border-t border-gray-200 mt-1 pt-2">
                            <span>Total:</span>
                            <span>{formatPrice(order.total)}</span>
                          </p>
                        </div>
                        
                        {order.status === "entregado" && (
                          <div className="mt-4 flex justify-end">
                            <button className="flex items-center text-[#8B4513] font-medium text-sm">
                              <FaFilePdf className="mr-2" />
                              Descargar factura
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 