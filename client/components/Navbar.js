import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <nav>

      <h2>Far, Far Away...</h2>
      <Link to="/home">Home</Link>
      <Link to="/galaxies">Destinations</Link>
      <Link to="/aboutUs">About Us</Link>
      <div className="shoppingCartInNav">

        <Link to="/cart">
          <img
          id="shopping-cart-icon"
          src="https://i.ibb.co/bRrVJVC/iconmonstr-basket-3-32.png"
        ></img>
          <span className="quantityInCart">3</span>
        </Link>

      </div>
      <h3>Welcome, {isLoggedIn ? username : 'Guest'}</h3>

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
       <div><Link to="/signup">Sign Up</Link></div>  
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
