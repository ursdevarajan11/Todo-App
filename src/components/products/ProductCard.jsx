import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="product-card">

      <div className="product-card__image-box">
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.title}
          className="product-card__image"
        />
      </div>

      <div className="product-card__body">

        <div className="product-card__meta">
          <span className="product-card__category">
            {product.category}
          </span>

          <span className="product-card__rating">
            ★ {product.rating}
          </span>
        </div>

        <h2 className="product-card__name">
          {product.title}
        </h2>

        <p className="product-card__description">
          {product.description}
        </p>

        <div className="product-card__footer">

          <strong className="product-card__price">
            ${product.price.toFixed(2)}
          </strong>

          <Link
            to={`/products/${product.id}`}
            className="product-card__button"
          >
            View
          </Link>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;