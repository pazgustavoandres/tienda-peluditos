import Home from './pages/Home';
import BlogPage from './pages/Shop';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
  },
  {
    path: '/products',
    element: <Products />,
  },
]); 