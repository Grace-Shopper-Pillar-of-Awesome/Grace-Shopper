import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {}

  render() {
    return (
      <div>
        <div id="checkout_container">
          <form>
            <label>Form of Payment: </label>
            <select>
              <option>Card</option>
              <option>Paypal</option>
            </select>
            <button type="submit">Place Order</button>
          </form>
        </div>
        <div id="checkout_total_container">
          <p>Total: $3,000</p>
          <Link to="/cart">
            <button>Edit Cart</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Checkout);
