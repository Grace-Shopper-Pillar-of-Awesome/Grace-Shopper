import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, username }) => (
  <div>
    <nav>
      <h3>
        Welcome,{' '}
        {/* this is a placeholder, we'll need to create a route to go to the user profile */}
        {isLoggedIn ? (
          <Link id="user-profile-line" to="/userprofile">
            {username}
          </Link>
        ) : (
          'Guest'
        )}
      </h3>
      <Link to="/home">Home</Link>
      <Link to="/galaxies">Products</Link>
      <Link to="/aboutUs">About Us</Link>
      <Link to="/cart">
        <img
          id="shopping-cart"
          src="https://static.thenounproject.com/png/65006-200.png"
        ></img>
      </Link>
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
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
