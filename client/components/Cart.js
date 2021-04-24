import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart } from '../store/singleOrder';
import { connect } from 'react-redux';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn) {
      this.props.fetchCart(this.props.id);
    }
  }

  render() {
    const { total } = this.props.cart;
    const galaxies = this.props.cart.galaxies || [];
    return (
      <div id="cart_container">
        <div id="cart_list">
          <h2>My Cart</h2>
          {galaxies.map((galaxy) => (
            <CartItem key={galaxy.id} galaxy={galaxy} />
          ))}
        </div>
        <div id="cart_total">
          <p>Cart Total: {total}</p>
          <Link to="/checkout">
            <button id="go_checkout">Go To Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.singleOrder,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
