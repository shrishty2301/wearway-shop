// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./state/CartContext";
import Navbar from "./components/navbar";   // <- use correct casing
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
