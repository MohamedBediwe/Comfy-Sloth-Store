import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  Products,
  PrivateRoute,
  Checkout,
  Error,
  Cart,
  About,
  SingleProduct,
  AuthWrapper,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/comfy-sloth-store" element={<Home />} />
          <Route path="/comfy-sloth-store/about" element={<About />} />
          <Route path="/comfy-sloth-store/cart" element={<Cart />} />
          <Route path="/comfy-sloth-store/products" element={<Products />} />
          <Route
            path="/comfy-sloth-store/products/:id"
            element={<SingleProduct />}
          />
          <Route
            path="/comfy-sloth-store/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
