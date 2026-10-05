import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <section className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}

export default ProductList;