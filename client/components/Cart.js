import React, { Component } from 'react';

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
      <div>
        <div id="cart_list">
          <h3>My Cart</h3>
          <div className="cart_item">
            <img src="IMAGE_URL_HERE" />
            <div>
              <p>Galaxy Name</p>
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
            <button id="ORDER_ITEM_ID" onClick={this.handleDelete}>
              X
            </button>
          </div>
        </div>
        <hr />
        <div id="cart_total">
          <p>Cart Total: $3,000</p>
        </div>
      </div>
    );
  }
}

export default Cart;
