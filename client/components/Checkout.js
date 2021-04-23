import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, submitOrder } from '../store/singleOrder';

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
    console.log(this.state);
  }

  handleSubmit() {
    this.props.submitOrder(this.props.id, this.state.payment);
  }

  render() {
    const { total, paymentType } = this.props.cart;
    const galaxies = this.props.cart.galaxies || [];
    return (
      <div id="cart_container">
        <div id="cart_list">
          <h2>Checkout</h2>
          <p>Total: ${total}</p>
          <label htmlFor="payment">Pay with: </label>
          <select
            name="payment"
            value={this.state.payment}
            onChange={this.handleChange}
          >
            <option value="card">Card</option>
            <option value="paypal">Paypal</option>
          </select>
          <button type="button" onClick={this.handleSubmit}>
            Place Order
          </button>
        </div>
        <div id="cart_total">
          <h3>My Cart:</h3>
          {galaxies.map((galaxy) => (
            <div key={galaxy.id}>
              <p>
                {galaxy.name} - {galaxy.orderItems.quantity}
              </p>
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
  submitOrder: (id, payment) => dispatch(submitOrder(id, payment, history)),
});

export default connect(mapState, mapDispatch)(Checkout);
