import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./ProductDetailsPage.css";

function ProductDetailsPage() {
  const { id } = useParams();

  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.error("Product Details Error:", error);
      setError(
        error.message || "Unable to load product"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);

    setAddedMessage("Product added to cart!");

    setTimeout(() => {
      setAddedMessage("");
    }, 2000);
  };

  const currentCartItem = cartItems.find(
    (item) => item.id === product?.id
  );

  if (loading) {
    return (
      <main className="product-details-page">
        <div className="product-details-status">
          Loading product...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-details-page">
        <div className="product-details-status">
          <h2>Unable to load product</h2>

          <p>{error}</p>

          <Link
            to="/products"
            className="back-button"
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-details-page">

      <div className="product-details-container">

        <Link
          to="/products"
          className="back-button"
        >
          ← Back to Products
        </Link>

        <section className="product-details-card">

          <div className="product-details-image-box">
            <img
              src={
                product.images?.[0] ||
                product.thumbnail
              }
              alt={product.title}
              className="product-details-image"
            />
          </div>

          <div className="product-details-content">

            <span className="product-details-category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            <div className="product-details-rating">
              ★ {product.rating}
            </div>

            <p className="product-details-description">
              {product.description}
            </p>

            <div className="product-details-info">

              <div>
                <span>Price</span>
                <strong>
                  ${product.price.toFixed(2)}
                </strong>
              </div>

              <div>
                <span>Brand</span>
                <strong>
                  {product.brand || "N/A"}
                </strong>
              </div>

              <div>
                <span>Stock</span>
                <strong>
                  {product.stock}
                </strong>
              </div>

            </div>

            <button
              type="button"
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              {currentCartItem
                ? `Add More to Cart (${currentCartItem.quantity})`
                : "Add to Cart"}
            </button>

            {addedMessage && (
              <p className="cart-success-message">
                ✓ {addedMessage}
              </p>
            )}

            <Link
              to="/cart"
              className="view-cart-button"
            >
              View Cart
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

export default ProductDetailsPage;