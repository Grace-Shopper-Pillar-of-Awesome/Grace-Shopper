import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart } from '../store/singleOrder';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'card',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn) {
      this.props.fetchCart(this.props.id);
    }
  }

  handleChange(evt) {
    this.setState({
      payment: evt.target.value,
    });
  }

  handleSubmit() {}

  render() {
    const { total } = this.props.cart;
    const galaxies = this.props.cart.galaxies || [];
    console.log(galaxies);
    return (
      <div>
        <div id="checkout_container">
          <h2>Checkout</h2>
          <p>Total: ${total}</p>
          <form>
            <label>Form of Payment: </label>
            <select onChange={this.handleChange} value={this.state.payment}>
              <option value="card">Card</option>
              <option value="card">Paypal</option>
            </select>
            <button type="submit">Place Order</button>
          </form>
        </div>
        <div id="checkout_cart_container">
          {galaxies.map((galaxy) => (
            <div key={galaxy.id}>
              <p>{galaxy.name}</p>
              <p>Quantity: {galaxy.orderItems.quantity}</p>
            </div>
          ))}
          <Link to="/cart">
            <button>Edit Cart</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.singleOrder,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(Checkout);
