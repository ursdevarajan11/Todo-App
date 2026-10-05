import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TodoPage from "./pages/TodoPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";

import Navbar from "./components/Navbar";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/todo" replace />}
          />

          <Route
            path="/todo"
            element={<TodoPage />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetailsPage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;