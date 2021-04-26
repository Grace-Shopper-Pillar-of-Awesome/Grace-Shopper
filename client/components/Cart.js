import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, changeCartTotal } from '../store/cart';
import { connect } from 'react-redux';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.fetchCart(this.props.id);
      this.setState({
        total: this.props.cart.total,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.fetchCart(this.props.id);
    }
    if (prevProps.cart.galaxies !== this.props.cart.galaxies) {
      const total = this.calcTotal(this.props.cart.galaxies);
      this.setState({ total });
      this.props.updateTotal(this.props.id, this.props.cart.id, { total });
    }
  }

  calcTotal(galaxies) {
    let reducer = (accumulator, galaxy) => {
      let singleItemTotal =
        galaxy.orderItems.price * galaxy.orderItems.quantity;
      return accumulator + singleItemTotal;
    };
    const total = galaxies.reduce(reducer, 0);
    this.setState({ total });
    return galaxies.reduce(reducer, 0);
  }

  render() {
    const galaxies =
      this.props.cart.galaxies ||
      JSON.parse(window.localStorage.getItem('orderItems')) ||
      [];
    return (
      <div id="cart_container">
        <div id="cart_list">
          <h2>My Cart</h2>
          {galaxies.length >= 1 ? (
            galaxies.map((galaxy) => (
              <CartItem key={galaxy.id} galaxy={galaxy} />
            ))
          ) : (
            <p>There are no items in your cart!</p>
          )}
        </div>
        <div id="cart_total">
          {this.props.isLoggedIn ? (
            <div>
              <p>Cart Total: ${this.state.total/100}</p>
              <Link to="/checkout">
                <button id="go_checkout">Go To Checkout</button>
              </Link>
            </div>
          ) : (
            <p>Please log in or sign up to check out.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  id: state.auth.id,
  isLoggedIn: !!state.auth.id,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    updateTotal: (userId, orderId, total) =>
      dispatch(changeCartTotal(userId, orderId, total)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
