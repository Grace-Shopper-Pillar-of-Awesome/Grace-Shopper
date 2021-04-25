import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <nav>
      <h3>Welcome, {isLoggedIn ? username : 'Guest'}</h3>
      <Link to="/home">Home</Link>
      <Link to="/galaxies">Products</Link>
      <Link to="/aboutUs">About Us</Link>
      <div className="shoppingCartInNav">
        <Link to="/cart">
          <img
            id="shopping-cart"
            src="https://static.thenounproject.com/png/65006-200.png"
          ></img>
          <span className="quantityInCart">3</span>
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
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
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
