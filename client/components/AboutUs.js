import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

/**
 * COMPONENT
 */
export const AboutUs = (props) => {
  const { username, isLoggedIn, fetchCart, id } = props;
  if (isLoggedIn) fetchCart(id);
  return (
    <div>
    <div className="content">
      <h3 className="aboutUs">The engineering team</h3>
    </div>
    <div className="us">

    </div>
    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = (state) => ({
  username: state.auth.username,
  isLoggedIn: !!state.auth.id,
  id: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(AboutUs);