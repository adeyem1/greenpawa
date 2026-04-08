import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Calculator from './pages/Calculator';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '12px', fontFamily: 'inherit', fontSize: '14px' },
              success: { iconTheme: { primary: '#0B3D2E', secondary: '#fff' } },
            }}
          />
          <Navbar />
          <Cart />
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/products"   element={<Products />} />
            <Route path="/services"   element={<Services />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/about"      element={<About />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/admin"      element={<Admin />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
