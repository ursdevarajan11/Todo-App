import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar__container">

        <NavLink
          to="/todo"
          className={({ isActive }) =>
            isActive
              ? "navbar__link active"
              : "navbar__link"
          }
        >
          Todo
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "navbar__link active"
              : "navbar__link"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "navbar__link active cart-link"
              : "navbar__link cart-link"
          }
        >
          🛒 Cart

          <span className="cart-count">
            {totalItems}
          </span>
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;