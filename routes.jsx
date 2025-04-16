import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientProfile from './pages/ClientProfile';
import ServerProfile from './pages/ServerProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import ForgotPassword from './pages/ForgotPassword';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import ShippingAddresses from './pages/ShippingAddresses';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/dogs" element={<Dogs />} />
      <Route path="/cats" element={<Cats />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/client-profile" element={<ClientProfile />} />
      <Route path="/server-profile" element={<ServerProfile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/shipping-addresses" element={<ShippingAddresses />} />
    </Routes>
  );
}
