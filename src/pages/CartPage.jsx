import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

import "./CartPage.css";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [purchaseMessage, setPurchaseMessage] =
    useState("");

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      return;
    }

    setPurchaseMessage(
      "Order placed successfully! Thank you for your purchase."
    );

    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">

        <section className="empty-cart">

          <div className="empty-cart__icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Add some products to your cart and
            come back here.
          </p>

          {purchaseMessage && (
            <p className="purchase-success">
              ✓ {purchaseMessage}
            </p>
          )}

          <Link
            to="/products"
            className="continue-shopping-button"
          >
            Continue Shopping
          </Link>

        </section>

      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-container">

        <div className="cart-header">

          <div>
            <p className="cart-eyebrow">
              Shopping Cart
            </p>

            <h1>Your Cart</h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>

        <section className="cart-content">

          <div className="cart-items">

            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >

                <img
                  src={
                    item.images?.[0] ||
                    item.thumbnail
                  }
                  alt={item.title}
                  className="cart-item__image"
                />

                <div className="cart-item__details">

                  <span className="cart-item__category">
                    {item.category}
                  </span>

                  <h2>{item.title}</h2>

                  <p>
                    ${item.price.toFixed(2)} each
                  </p>

                </div>

                <div className="cart-item__controls">

                  <div className="quantity-controls">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) =>
                        updateQuantity(
                          item.id,
                          event.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <strong className="cart-item__total">
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="delete-cart-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </article>
            ))}

          </div>

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>
                ${totalPrice.toFixed(2)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ${totalPrice.toFixed(2)}
              </strong>
            </div>

            <button
              type="button"
              className="buy-now-button"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            {purchaseMessage && (
              <p className="purchase-success">
                ✓ {purchaseMessage}
              </p>
            )}

            <Link
              to="/products"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>

          </aside>

        </section>

      </div>

    </main>
  );
}

export default CartPage;