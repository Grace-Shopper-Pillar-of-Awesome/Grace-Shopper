import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value,
    });
  }

  handleDelete(evt) {}

  render() {
    return (
      <div id="cart_container">
        <div id="cart_list">
          <h2>My Cart</h2>
          <div className="cart_item">
            <img src="IMAGE_URL_HERE" />
            <div>
              <p className="cart_name">Galaxy Name</p>
              <p>Galaxy Cost</p>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                min={1}
                max={100}
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="delete"
              id="ORDER_ITEM_ID"
              onClick={this.handleDelete}
            >
              X
            </button>
          </div>
          <div className="cart_item">
            <img src="IMAGE_URL_HERE" />
            <div>
              <p className="cart_name">Galaxy Name</p>
              <p>Galaxy Cost</p>
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                min={1}
                max={100}
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
            <button
              className="delete"
              id="ORDER_ITEM_ID"
              onClick={this.handleDelete}
            >
              X
            </button>
          </div>
        </div>
        <div id="cart_total">
          <p>Cart Total: $3,000</p>
          <Link to="/CHECKOUT_ROUTE_HERE">
            <button id="go_checkout">Go To Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
