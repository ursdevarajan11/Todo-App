import { useEffect, useState } from "react";
import ProductList from "../components/products/ProductList";
import "./ProductsPage.css";

const API_URL = "https://dummyjson.com/products?limit=0";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      // DummyJSON returns products inside the "products" property
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error("Invalid product data received");
      }

      setProducts(data.products);
    } catch (error) {
      console.error("Product API Error:", error);
      setProducts([]);
      setError(error.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="products-page">
      <header className="products-page__header">
        <div className="products-page__title-wrap">
          <p className="products-page__eyebrow">
            Featured Collection
          </p>

          <h1 className="products-page__title">
            Products
          </h1>

          <p className="products-page__subtitle">
            Explore products from DummyJSON API.
          </p>
        </div>
      </header>

      <section className="products-page__content">

        {/* Loading State */}
        {loading && (
          <div className="products-status">
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="products-status products-status--error">
            <p>Unable to load products.</p>

            <p>
              The product server is temporarily unavailable.
              Please try again later.
            </p>

            <button
              type="button"
              onClick={fetchProducts}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products */}
        {!loading && !error && products.length > 0 && (
          <ProductList products={products} />
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="products-status">
            <p>No products found.</p>
          </div>
        )}

      </section>
    </main>
  );
}

export default ProductsPage;