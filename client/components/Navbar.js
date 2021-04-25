import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn, username, userType, cart }) => {
  console.log("quantity", cart)
  return (
  <div>
    <nav>
      {
        userType === "admin" ? 
        <div>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
        </div> :
        <h3>Welcome, {isLoggedIn ? username : 'Guest'}</h3>
      }
      <Link to="/home">Home</Link>
      <Link to="/galaxies">Products</Link>
      <Link to="/aboutUs">About Us</Link>
      <div className="shoppingCartInNav">

        <Link to="/cart">
          <img
            id="shopping-cart"
            src="https://static.thenounproject.com/png/65006-200.png"
          ></img>
          <span className="quantityInCart">
            {
              cart.galaxies ? cart.galaxies.map((galaxy)=>{ let qt=0; return qt+=Number(galaxy.orderItems.quantity)}) : 0
            }
          </span>
        </Link>

      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a id="logout" href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    userType: state.auth.userType,
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
