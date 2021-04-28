import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCart, submitOrder } from '../store/cart';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payment: 'card',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.id && this.props.id) {
      this.props.fetchCart(this.props.id);
    }
  }

  handleChange(evt) {
    this.setState({
      payment: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.submitOrder(this.props.id, this.state, this.props.history);
  }

  render() {
    const { total } = this.props.cart;
    const galaxies = this.props.cart.galaxies || [];
    return (
      <div id="cart_container">
        <div id="cart_list">
          <h1 className ="checkout-title">Checkout</h1>
          {total > 0 ? (
            <div>
              <h3 className ="checkout-total">Your Total: ${total / 100}</h3>
              <label className ="checkout-txt" htmlFor="payment">Pay with: </label>
              <div>
                <select
                  className ="payment-type"
                name="payment"
                value={this.state.payment}
                onChange={this.handleChange}
              >
                <option value="card">card</option>
                  <option value="paypal">paypal</option>
                </select>
                </div>
              <div className = "place-order"> 
              <button type="button" onClick={this.handleSubmit}>
                  Place Order
              </button>
                </div>
            </div>
          ) : (
            <h2>There aren't any items in your cart!</h2>
          )}
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
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
  submitOrder: (id, payment, history) =>
    dispatch(submitOrder(id, payment, history)),
});

export default connect(mapState, mapDispatch)(Checkout);
