import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cart extends Component {
  render() {
    return (
      <div>
        <div id="cart_list">
          <h1>My Cart</h1>
        </div>
        <div className="total">
          <p>Cart Total: $3,000</p>
          <Link to="/ADD_ROUTE_HERE">
            <button>Go To Checkout</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Cart;
